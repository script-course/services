import type {Component} from 'vue';

export interface FormModalData<T = unknown> {
    form: T;
    component: Component;
    submitEvent: (edited: T) => Promise<void> | void;
    size: 'md' | 'lg';
}

export interface FormModal {
    component: Component;
    modal: FormModalData;
}

export interface ConfirmModalData {
    message: string;
    okButtonText: string;
    cancelButtonText: string;
    resolver: (value: boolean | PromiseLike<boolean>) => void;
}

export interface ConfirmModal {
    component: Component;
    modal: ConfirmModalData;
}

export interface ShowModalData {
    component: Component;
    size: 'md' | 'lg' | 'fullscreen';
    props?: Record<string, unknown>;
}

export interface ShowModal {
    component: Component;
    modal: ShowModalData;
}
