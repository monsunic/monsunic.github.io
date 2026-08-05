export { D as DeprecationsPlugin } from './shared/unhead.MwN19KUk.mjs';
import { c as createUnhead } from './shared/unhead.V0sCH25f.mjs';
import { U as Unhead, C as CreateClientHeadOptions, a as CreateServerHeadOptions, H as HeadPluginInput } from './shared/unhead.DUxwbN2T.mjs';
import { R as ResolvableHead } from './shared/unhead.DlwqNKKE.mjs';
import 'hookable';

/**
 * The v2 migration plugins applied by the legacy `createHead`/`createServerHead`, including
 * Promise input resolution. Modern entrypoints require `PromisesPlugin` to be registered explicitly.
 *
 * @deprecated Will be removed in v4. Migrate call sites to the v3 API and construct
 * `createHead`/`createServerHead` from `unhead/client`/`unhead/server` without this plugin set.
 */
declare const legacyPlugins: HeadPluginInput[];
/**
 * @deprecated Will be removed in v4. This global singleton exists only to support the legacy
 * `getActiveHead()` API; use the `Unhead` instance returned by `createHead`/`createServerHead` directly instead.
 */
declare const activeHead: {
    value: Unhead<any> | null;
};
/**
 * @deprecated Will be removed in v4. Store and use the `Unhead` instance returned by
 * `createHead`/`createServerHead` directly instead of reading it from a global singleton.
 */
declare function getActiveHead<T extends Record<string, any> = ResolvableHead>(): Unhead<T> | null;
/**
 * @deprecated Will be removed in v4. Use `createHead` from `unhead/client` instead; register
 * `legacyPlugins` yourself if you still need v1/v2 tag prop compatibility.
 */
declare function createHead<T extends Record<string, any> = ResolvableHead>(options?: CreateClientHeadOptions): Unhead<T>;
/**
 * @deprecated Will be removed in v4. Use `createServerHead` from `unhead/server` instead; register
 * `legacyPlugins` yourself if you still need v1/v2 tag prop compatibility.
 */
declare function createServerHead<T extends Record<string, any> = ResolvableHead>(options?: Omit<CreateServerHeadOptions, 'propResolvers'>): Unhead<T>;
/**
 * @deprecated Will be removed in v4. Use `createUnhead` from `unhead` directly.
 */
declare const createHeadCore: typeof createUnhead;

export { activeHead, createHead, createHeadCore, createServerHead, getActiveHead, legacyPlugins };
