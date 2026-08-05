import { C as ClientUnhead } from './shared/unhead.BaJQWegN.mjs';
import { C as CreateClientHeadOptions, b as HeadRenderer, U as Unhead } from './shared/unhead.DUxwbN2T.mjs';
import { R as ResolvableHead } from './shared/unhead.DlwqNKKE.mjs';
import { R as RenderDomHeadOptions } from './shared/unhead.xegbm7gb.mjs';
import 'hookable';

declare function createHead<T = ResolvableHead>(options?: CreateClientHeadOptions): ClientUnhead<T>;

declare function createDomRenderer(options?: RenderDomHeadOptions): HeadRenderer<boolean>;
/** @deprecated Use `head.render()` instead */
declare function renderDOMHead<T extends Unhead<any>>(head: T, options?: RenderDomHeadOptions): boolean;

declare function createDebouncedFn(callee: () => void, delayer: (fn: () => void) => void): () => void;

export { ClientUnhead, CreateClientHeadOptions, Unhead, createDebouncedFn, createDomRenderer, createHead, renderDOMHead };
