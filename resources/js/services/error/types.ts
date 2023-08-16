import type {Ref} from 'vue';

export interface ErrorBag {[property: string]: string[]}
export type ErrorBagRef = Ref<ErrorBag>;
