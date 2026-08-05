import { a as createStreamClientHeadAdapter } from '../shared/unhead.Bb4d5b9h.mjs';
import { c as createHooks } from '../shared/unhead.Bm4Y6XQI.mjs';
import '../shared/unhead.D7HkBzZn.mjs';
import 'hookable';

const DEFAULT_STREAM_KEY = "__unhead__";
function createStreamableHead(options = {}) {
  const { streamKey = DEFAULT_STREAM_KEY, ...rest } = options;
  const win = typeof window !== "undefined" ? window : void 0;
  const streamQueue = win?.[streamKey];
  const core = streamQueue?._head;
  if (!core)
    return void 0;
  if (core._wrapped)
    return core;
  const isHydrationLocked = () => streamQueue?._hydrationLocked?.() ?? false;
  const coreRender = core.render;
  const hooks = createHooks(rest.hooks);
  const head = createStreamClientHeadAdapter(core, hooks, () => coreRender(), isHydrationLocked);
  head._wrapped = true;
  (rest.plugins || []).forEach((p) => head.use(p));
  rest.init?.forEach((e) => e && head.push(e));
  if (streamQueue)
    streamQueue._head = head;
  return head;
}

export { DEFAULT_STREAM_KEY, createStreamableHead };
