export { c as createHead } from './shared/unhead.BCcw-xUY.mjs';
export { c as createDomRenderer, r as renderDOMHead } from './shared/unhead.BuspQZgK.mjs';
import './shared/unhead.D7HkBzZn.mjs';
import './shared/unhead.CGPOfp5O.mjs';
import './shared/unhead.Bm4Y6XQI.mjs';
import 'hookable';
import './shared/unhead.Bb4d5b9h.mjs';
import './shared/unhead.DNKiVLV7.mjs';

function createDebouncedFn(callee, delayer) {
  let ctxId = 0;
  return () => {
    const delayFnCtxId = ++ctxId;
    delayer(() => {
      if (ctxId === delayFnCtxId) {
        callee();
      }
    });
  };
}

export { createDebouncedFn };
