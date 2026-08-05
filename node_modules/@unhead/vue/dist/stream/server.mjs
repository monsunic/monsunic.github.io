import { createStreamableHead as createStreamableHead$1, wrapStream, renderSSRHeadSuspenseChunk } from 'unhead/stream/server';
export { createBootstrapScript, prepareStreamingTemplate, prepareTemplate, renderSSRHeadShell, renderSSRHeadSuspenseChunk, renderShell, wrapStream } from 'unhead/stream/server';
import { v as vueInstall } from '../shared/vue.DKb5ZKVl.mjs';
import { V as VueResolver } from '../shared/vue.D2XR8FqS.mjs';
import 'vue';

function createStreamableHead(options = {}) {
  const { head } = createStreamableHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  const vueHead = head;
  vueHead.install = vueInstall(vueHead);
  const flushPatch = () => {
    const patch = renderSSRHeadSuspenseChunk(vueHead);
    return patch ? `<script>${patch};document.currentScript.remove()<\/script>` : "";
  };
  return {
    head: vueHead,
    wrapStream: (stream, template) => wrapStream(vueHead, stream, template, void 0, { flushChunk: flushPatch })
  };
}

export { createStreamableHead };
