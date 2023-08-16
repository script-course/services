import {computed, ref} from 'vue';

import {registerRequestMiddleware, registerResponseErrorMiddleware} from '../http';
import {registerAfterMiddleware} from '../router';

interface ErrorBag {
    [property: string]: string[];
}

const errorBag = ref<ErrorBag>({});

export const getErrorBag = computed(() => errorBag.value);

export const getErrorByProperty = (property: string) => computed(() => errorBag.value[property]);
export const setErrorByProperty = (property: string, error: string[]) => (errorBag.value[property] = error);

export const setErrorBag = (bag: ErrorBag) => (errorBag.value = bag);

export const destroyErrors = () => (errorBag.value = {});

registerAfterMiddleware(destroyErrors);
registerRequestMiddleware(destroyErrors);
registerResponseErrorMiddleware(({response}) => {
    if (!response || !response.data?.errors) return;
    setErrorBag(response.data.errors);
});
