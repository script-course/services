import {Modal} from 'bootstrap';

export const createModal = (
    element: HTMLDivElement,
    emit: (event: 'hide') => void,
    backdrop: boolean | 'static' = 'static',
    keyboard = false,
    focus = false,
) => {
    const modal = new Modal(element, {
        backdrop,
        keyboard,
        focus,
    });
    modal.toggle();
    element.addEventListener('hidden.bs.modal', () => emit('hide'));

    return modal;
};
