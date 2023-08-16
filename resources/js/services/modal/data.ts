import type {ConfirmModal, FormModal, ShowModal} from './types';

import {ref} from 'vue';


export const modals = ref<(ShowModal | ConfirmModal | FormModal)[]>([]);
