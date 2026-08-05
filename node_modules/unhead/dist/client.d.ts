import { C as ClientUnhead } from './shared/unhead.DyeObMtD.js';
import { C as CreateClientHeadOptions, b as HeadRenderer, U as Unhead } from './shared/unhead.DMdqq-Si.js';
import { R as ResolvableHead } from './shared/unhead.DlwqNKKE.js';
import { R as RenderDomHeadOptions } from './shared/unhead.Dtnr8h2R.js';
import 'hookable';

declare function createHead<T = ResolvableHead>(options?: CreateClientHeadOptions): ClientUnhead<T>;

declare function createDomRenderer(options?: RenderDomHeadOptions): HeadRenderer<boolean>;
/** @deprecated Use `head.render()` instead */
declare function renderDOMHead<T extends Unhead<any>>(head: T, options?: RenderDomHeadOptions): boolean;

declare function createDebouncedFn(callee: () => void, delayer: (fn: () => void) => void): () => void;

export { ClientUnhead, CreateClientHeadOptions, Unhead, createDebouncedFn, createDomRenderer, createHead, renderDOMHead };
