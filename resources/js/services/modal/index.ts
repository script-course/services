import './container';
import type {FormModalData} from './types';
import type {Component} from 'vue';

import {markRaw} from 'vue';

import {modals} from './data';
import ConfirmModalComponent from './dom/ConfirmModal.vue';
import FormModalComponent from './dom/FormModal.vue';
import ShowModalComponent from './dom/ShowModal.vue';

export const formModal = <T>(
    form: T,
    component: Component,
    submitEvent: (edited: T) => Promise<void> | void,
    size: 'md' | 'lg' = 'lg',
) => {
    const modal: FormModalData<T> = {
        form,
        component: markRaw(component),
        submitEvent,
        size,
    };
    modals.value.push({component: markRaw(FormModalComponent), modal});
};

export const confirmModal = (message: string, okButtonText: string, cancelButtonText = 'Annuleren') =>
    new Promise<boolean>(resolve => {
        modals.value.push({
            component: markRaw(ConfirmModalComponent),
            modal: {
                message,
                okButtonText,
                cancelButtonText,
                resolver: resolve,
            },
        });
    });

export const showModal = (component: Component, props?: Record<string, unknown>, size: 'md' | 'lg' = 'lg') => {
    modals.value.push({component: markRaw(ShowModalComponent), modal: {component: markRaw(component), props, size}});
};
