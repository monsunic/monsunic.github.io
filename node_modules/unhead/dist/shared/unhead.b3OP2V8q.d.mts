import { HookableCore } from 'hookable';
import { U as Unhead, S as SSRHeadPayload, g as ServerHeadHooks, a as CreateServerHeadOptions } from './unhead.DUxwbN2T.mjs';
import { R as ResolvableHead } from './unhead.DlwqNKKE.mjs';

interface ServerUnhead<T = ResolvableHead> extends Unhead<T, SSRHeadPayload> {
    hooks: HookableCore<ServerHeadHooks>;
}
declare function createHead<T = ResolvableHead>(options?: CreateServerHeadOptions): ServerUnhead<T>;

export { createHead as c };
export type { ServerUnhead as S };
