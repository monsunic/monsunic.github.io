import { r as registerPlugin } from './unhead.D7HkBzZn.mjs';

function createClientHeadAdapter(core, hooks, render) {
  const corePush = core.push;
  const head = core;
  head.ssr = false;
  head.hooks = hooks;
  head.dirty = !!head.dirty;
  head.use = (p) => registerPlugin(head, p);
  head.render = () => render(head);
  head.invalidate = () => {
    for (const entry of head.entries.values())
      delete entry._tags;
    head.dirty = true;
    hooks.callHook("entries:updated", head);
  };
  head.push = (input, entryOptions) => {
    const unhook = entryOptions?.onRendered ? hooks.hook("dom:rendered", entryOptions.onRendered) : void 0;
    const active = corePush(input, entryOptions);
    const entry = core.entries.get(active._i);
    if (entry)
      entry._o = input;
    head.dirty = true;
    hooks.callHook("entries:updated", head);
    return {
      _i: active._i,
      patch(input2) {
        active.patch(input2);
        head.dirty = true;
        hooks.callHook("entries:updated", head);
      },
      dispose() {
        unhook?.();
        if (core.entries.has(active._i)) {
          active.dispose();
          head.invalidate();
        }
      }
    };
  };
  hooks.hook("entries:updated", () => {
    head.render();
  });
  return head;
}
function createStreamClientHeadAdapter(core, hooks, render, locked) {
  const head = createClientHeadAdapter(core, hooks, render);
  const push = head.push;
  head.push = (input, options) => {
    if (locked()) {
      return {
        _i: -1,
        patch: () => {
        },
        dispose: () => {
        }
      };
    }
    const active = push(input, options);
    const patch = active.patch;
    active.patch = (input2) => !locked() && patch(input2);
    return active;
  };
  return head;
}

export { createStreamClientHeadAdapter as a, createClientHeadAdapter as c };
