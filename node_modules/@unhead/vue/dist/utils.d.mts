import { PropResolver, ResolvableHead } from 'unhead/types';
export * from 'unhead/utils';
import { U as UseHeadInput } from './shared/vue.B8YcFbNO.mjs';
import 'vue';

declare const VueResolver: PropResolver;

/**
 * @deprecated Use `resolveTags(head)` from `unhead/utils` instead.
 */
declare function resolveUnrefHeadInput(input: UseHeadInput): ResolvableHead | false | null | undefined;

export { VueResolver, resolveUnrefHeadInput };
