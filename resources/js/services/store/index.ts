import type {New, State, Updatable} from './types';

import {computed, ref} from 'vue';

import {deleteRequest, getRequest, postRequest, putRequest} from '../http';

/**
 * Creates a store module for the given module name.
 */
// eslint-disable-next-line max-lines-per-function
export const storeModuleFactory = <T extends {id: number}>(moduleName: string) => {
    const state: State<T> = ref({});

    const getters = {
        /** Get all items from the store */
        all: computed(() => Object.values(state.value)),
        /**
         * Get an item from the state by id
         */
        byId: (id: number) => computed(() => state.value[id]),
    };

    const setters = {
        /**
         * Set items in the state.
         */
        setAll: (items: T[]) => {
            for (const item of items) state.value[item.id] = Object.freeze(item);
        },
        /**
         * Set one specific item in the storage
         */
        setById: (item: T) => {
            state.value[item.id] = Object.freeze(item);
        },
        /**
         * Delete one specific item in the storage by id
         */
        deleteById: (id: number) => {
            delete state.value[id];
        },
    };

    const actions = {
        getAll: async () => {
            const {data} = await getRequest(moduleName);
            if (!data) return;
            setters.setAll(data);
        },
        getById: async (id: number) => {
            const {data} = await getRequest(`${moduleName}/${id}`);
            if (!data) return;
            setters.setById(data);
        },
        create: async (newItem: New<T>) => {
            const {data} = await postRequest(moduleName, newItem);
            if (!data) return;
            setters.setById(data);
        },
        update: async (id: number, item: Updatable<T>) => {
            const {data} = await putRequest(`${moduleName}/${id}`, item);
            if (!data) return;
            setters.setById(data);
        },
        delete: async (id: number) => {
            await deleteRequest(`${moduleName}/${id}`);
            setters.deleteById(id);
        },
    };

    return {
        state,
        getters,
        setters,
        actions,
    };
};
