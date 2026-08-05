import { parseHtmlForIndexes, applyHeadToHtml } from '../parser.mjs';
export { prepareTemplate } from '../parser.mjs';
import { c as createHead } from '../shared/unhead.sGLr_XKf.mjs';
import { e as resolveHeadInput } from '../shared/unhead.DNKiVLV7.mjs';
import { DEFAULT_STREAM_KEY } from './client.mjs';
import '../shared/unhead.Bf_fPVYA.mjs';
import '../shared/unhead.D7HkBzZn.mjs';
import '../shared/unhead.Bm4Y6XQI.mjs';
import 'hookable';
import '../shared/unhead.CGPOfp5O.mjs';
import '../shared/unhead.Bb4d5b9h.mjs';

const LT_RE = /</g;
const GT_RE = />/g;
const AMP_RE = /&/g;
const SSR_OUTLET_RE = /<!--\s*(?:app-html|ssr-outlet)\s*-->/;
let encoder;
let preparedStreamingLayouts;
const VALID_STREAM_KEY_RE = /^[$_a-z][$\w]*$/i;
function assertValidStreamKey(streamKey) {
  if (typeof streamKey !== "string" || !VALID_STREAM_KEY_RE.test(streamKey)) {
    throw new Error(
      `[unhead] Invalid streamKey: must be a valid JavaScript identifier matching ${VALID_STREAM_KEY_RE}. Received: ${JSON.stringify(streamKey)}`
    );
  }
}
// @__NO_SIDE_EFFECTS__
function createStreamableHead(options = {}) {
  const { streamKey, ...rest } = options;
  if (streamKey !== void 0)
    assertValidStreamKey(streamKey);
  const head = createHead({
    ...rest,
    experimentalStreamKey: streamKey
  });
  let resolveShellReady;
  const shellReady = new Promise((resolve) => {
    resolveShellReady = resolve;
  });
  return {
    head,
    onShellReady: () => resolveShellReady(),
    shellReady
  };
}
function getStreamKey(head) {
  const key = head.resolvedOptions.experimentalStreamKey || DEFAULT_STREAM_KEY;
  assertValidStreamKey(key);
  return key;
}
function createBootstrapScript(streamKey = DEFAULT_STREAM_KEY, nonce) {
  assertValidStreamKey(streamKey);
  const nonceAttr = nonce ? ` nonce="${nonce.replace(/"/g, "&quot;")}"` : "";
  return `<script${nonceAttr}>window.${streamKey}={_q:[],push(e){this._q.push(e)}}<\/script>`;
}
function renderShell(head) {
  const result = head.render();
  head.entries.clear();
  return result;
}
function renderSSRHeadShell(head, template) {
  const parsed = typeof template === "string" ? parseHtmlForIndexes(template) : template;
  const result = applyShellToTemplate(head, head.render(), parsed);
  head.entries.clear();
  return result;
}
function applyShellToTemplate(head, ssr, parsed) {
  return applyHeadToHtml(parsed, {
    htmlAttrs: ssr.htmlAttrs,
    headTags: createBootstrapScript(getStreamKey(head)) + ssr.headTags,
    bodyAttrs: ssr.bodyAttrs,
    bodyTags: ssr.bodyTags
  });
}
function renderSSRHeadSuspenseChunk(head) {
  if (!head.entries.size)
    return "";
  const streamKey = getStreamKey(head);
  const propResolvers = head.resolvedOptions.propResolvers || [];
  let serialized;
  try {
    const inputs = Array.from(head.entries.values(), (e) => resolveHeadInput(e.input, propResolvers));
    serialized = safeJsonStringify(inputs);
  } catch (error) {
    for (const [key, entry] of head.entries) {
      try {
        safeJsonStringify(resolveHeadInput(entry.input, propResolvers));
      } catch {
        head.entries.delete(key);
      }
    }
    throw error;
  }
  head.entries.clear();
  return `window.${streamKey}.push(${serialized})`;
}
function safeJsonStringify(obj) {
  return JSON.stringify(obj).replace(LT_RE, "\\u003c").replace(GT_RE, "\\u003e").replace(AMP_RE, "\\u0026");
}
function wrapStream(head, stream, template, preRenderedState, options) {
  const flushChunk = options?.flushChunk;
  const enc = encoder ??= new TextEncoder();
  let reader;
  let end = "";
  return new ReadableStream({
    // Async so a failure here rejects into an errored stream instead of
    // throwing synchronously out of the constructor. The reader is acquired
    // before rendering (and released if rendering fails) so a failure at
    // either step leaves `head.entries` intact and the upstream unlocked
    // for retry.
    async start(controller) {
      const activeReader = stream.getReader();
      let parts;
      try {
        parts = prepareStreamingTemplate(head, template, preRenderedState);
      } catch (error) {
        activeReader.releaseLock();
        throw error;
      }
      reader = activeReader;
      end = parts.end;
      controller.enqueue(enc.encode(parts.shell));
    },
    // Read at most one upstream chunk per downstream request so backpressure
    // propagates instead of eagerly draining the app stream.
    async pull(controller) {
      const activeReader = reader;
      if (!activeReader)
        return;
      const result = await activeReader.read().then(
        (value) => ({ ok: true, value }),
        (error) => ({ ok: false, error })
      );
      if (activeReader !== reader)
        return;
      if (!result.ok) {
        reader = void 0;
        activeReader.releaseLock();
        controller.error(result.error);
        return;
      }
      if (result.value.done) {
        reader = void 0;
        activeReader.releaseLock();
        const extra2 = flushChunk?.();
        if (extra2)
          controller.enqueue(enc.encode(extra2));
        if (end)
          controller.enqueue(enc.encode(end));
        controller.close();
        return;
      }
      controller.enqueue(result.value.value);
      const extra = flushChunk?.();
      if (extra)
        controller.enqueue(enc.encode(extra));
    },
    async cancel(reason) {
      const activeReader = reader;
      reader = void 0;
      if (activeReader) {
        try {
          await activeReader.cancel(reason);
        } catch {
        }
        activeReader.releaseLock();
      }
    }
  });
}
function createStreamingTemplateLayout(parsed) {
  const html = parsed.html;
  const bodyEnd = parsed.indexes.bodyTagEnd;
  const bodyCloseStart = parsed.indexes.bodyCloseTagStart;
  if (bodyEnd < 0 || bodyCloseStart < 0)
    return;
  const bodyInterior = html.substring(bodyEnd, bodyCloseStart);
  const markerMatch = bodyInterior.match(SSR_OUTLET_RE);
  let beforeStream;
  let afterStream;
  if (markerMatch) {
    beforeStream = bodyInterior.substring(0, markerMatch.index);
    afterStream = bodyInterior.substring(markerMatch.index + markerMatch[0].length);
  } else {
    beforeStream = "";
    afterStream = bodyInterior;
  }
  const shellPart = html.substring(0, bodyEnd) + beforeStream;
  const endPart = html.substring(bodyCloseStart);
  let shellTemplate;
  if (bodyCloseStart >= bodyEnd) {
    const shellLen = shellPart.length;
    const { htmlTagStart, headTagEnd, bodyTagStart } = parsed.indexes;
    const shellHtmlTagStart = htmlTagStart >= 0 && htmlTagStart + 5 <= shellLen ? htmlTagStart : -1;
    let shellHtmlTagEnd = -1;
    if (shellHtmlTagStart >= 0) {
      const gt = shellPart.indexOf(">", shellHtmlTagStart);
      shellHtmlTagEnd = gt >= 0 ? gt + 1 : shellLen + 7;
    }
    shellTemplate = {
      html: `${shellPart}</body></html>`,
      input: parsed.input,
      indexes: {
        htmlTagStart: shellHtmlTagStart,
        htmlTagEnd: shellHtmlTagEnd,
        headTagEnd: headTagEnd >= 0 && headTagEnd + 7 <= shellLen ? headTagEnd : -1,
        // <body> is always fully inside the prefix in this branch.
        bodyTagStart,
        bodyTagEnd: bodyEnd,
        bodyCloseTagStart: bodyCloseStart + 7 <= shellLen ? bodyCloseStart : shellLen
      }
    };
  } else {
    shellTemplate = parseHtmlForIndexes(`${shellPart}</body></html>`);
  }
  return {
    shellTemplate,
    endBeforeBodyTags: afterStream,
    endAfterBodyTags: endPart
  };
}
function getPreparedStreamingLayout(template) {
  const cache = preparedStreamingLayouts ||= /* @__PURE__ */ new WeakMap();
  let layout = cache.get(template);
  if (layout === void 0) {
    layout = createStreamingTemplateLayout(template) || null;
    if (layout) {
      Object.freeze(layout.shellTemplate.indexes);
      Object.freeze(layout.shellTemplate);
      Object.freeze(layout);
    }
    cache.set(template, layout);
  }
  return layout || void 0;
}
function prepareStreamingTemplate(head, template, preRenderedState) {
  const ssr = preRenderedState ?? head.render();
  const parsed = typeof template === "string" ? parseHtmlForIndexes(template) : template;
  const layout = typeof template === "string" ? createStreamingTemplateLayout(parsed) : getPreparedStreamingLayout(template);
  let parts;
  if (layout) {
    const shell = applyHeadToHtml(layout.shellTemplate, {
      htmlAttrs: ssr.htmlAttrs,
      headTags: createBootstrapScript(getStreamKey(head)) + ssr.headTags,
      bodyAttrs: ssr.bodyAttrs,
      bodyTags: ""
    }).replace("</body></html>", "");
    parts = {
      shell,
      end: layout.endBeforeBodyTags + ssr.bodyTags + layout.endAfterBodyTags
    };
  } else {
    parts = {
      shell: applyShellToTemplate(head, ssr, parsed),
      end: ""
    };
  }
  if (!preRenderedState) {
    head.entries.clear();
  }
  return parts;
}

export { createBootstrapScript, createStreamableHead, prepareStreamingTemplate, renderSSRHeadShell, renderSSRHeadSuspenseChunk, renderShell, wrapStream };
