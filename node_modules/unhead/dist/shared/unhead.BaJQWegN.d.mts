import { HookableCore } from 'hookable';
import { R as ResolvableHead } from './unhead.DlwqNKKE.mjs';
import { U as Unhead, e as ClientHeadHooks } from './unhead.DUxwbN2T.mjs';

interface ClientUnhead<T = ResolvableHead> extends Unhead<T, boolean> {
    hooks: HookableCore<ClientHeadHooks>;
    dirty: boolean;
    invalidate: () => void;
}

export type { ClientUnhead as C };
