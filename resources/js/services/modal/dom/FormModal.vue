<template>
    <div ref="modalTemplate" class="fade modal" tabindex="-1" aria-labelledby="label" aria-hidden="true">
        <div class="modal-dialog" :class="`modal-${modal.size}`">
            <div class="modal-content">
                <div class="modal-body">
                    <component :is="modal.component" :form="modal.form" @submit="submit" @cancel="close" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type {FormModalData} from '../types';
import type {Modal} from 'bootstrap';

import {onMounted, ref} from 'vue';

import {createModal} from './logic';

const props = defineProps<{modal: FormModalData}>();

const emit = defineEmits<{(event: 'hide'): void}>();

const modalTemplate = ref<HTMLDivElement>();

let bootstrapModal: Modal;

const close = () => bootstrapModal.hide();

onMounted(() => {
    if (!modalTemplate.value) return;
    bootstrapModal = createModal(modalTemplate.value, emit);
});

const submit = async (form: unknown) => {
    await props.modal.submitEvent(form);
    close();
};
</script>
