import { S as SafeInputPlugin, F as FlatMetaPlugin } from './shared/unhead.JIneUUHd.mjs';
import { h as hasOwn } from './shared/unhead.Bf_fPVYA.mjs';
export { c as createUnhead } from './shared/unhead.D7HkBzZn.mjs';
export { u as useScript } from './shared/unhead.q9F_9EzH.mjs';
import './shared/unhead.BTzUdyNs.mjs';
import './shared/unhead.CGPOfp5O.mjs';
import './shared/unhead.CHEy9ana.mjs';
import './shared/unhead.Bm4Y6XQI.mjs';
import 'hookable';

function useHead(unhead, input, options = {}) {
  return unhead.push(input || {}, options);
}
function useHeadSafe(unhead, input = {}, options = {}) {
  unhead.use(SafeInputPlugin);
  return useHead(unhead, input, Object.assign(options, { _safe: true }));
}
function useSeoMeta(unhead, input = {}, options) {
  unhead.use(FlatMetaPlugin);
  function normalize(input2) {
    if (input2._flatMeta) {
      return input2;
    }
    const meta = {};
    for (const key in input2) {
      if (!hasOwn(input2, key) || key === "title" || key === "titleTemplate")
        continue;
      meta[key] = input2[key];
    }
    return {
      title: input2.title,
      titleTemplate: input2.titleTemplate,
      _flatMeta: meta
    };
  }
  const entry = unhead.push(normalize(input), options);
  const corePatch = entry.patch;
  if (!entry.__patched) {
    entry.patch = (input2) => corePatch(normalize(input2));
    entry.__patched = true;
  }
  return entry;
}

function defineLink(link) {
  return link;
}
function defineScript(script) {
  return script;
}

export { defineLink, defineScript, useHead, useHeadSafe, useSeoMeta };
