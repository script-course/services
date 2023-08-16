<template>
    <div ref="modalTemplate" class="fade modal" tabindex="-1" aria-labelledby="label" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-body">
                    <h5 id="label" class="modal-title">{{ modal.message }}</h5>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-light text-center" @click="resolve(false)">
                        {{ modal.cancelButtonText }}
                    </button>

                    <button class="btn btn btn-primary text-center" type="button" @click="resolve(true)">
                        {{ modal.okButtonText }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type {ConfirmModalData} from '../types';
import type {Modal} from 'bootstrap';

import {onMounted, ref} from 'vue';

import {createModal} from './logic';

const props = defineProps<{modal: ConfirmModalData}>();

const emit = defineEmits<{(event: 'hide'): void}>();

const modalTemplate = ref<HTMLDivElement>();

let bootstrapModal: Modal;

onMounted(() => {
    if (!modalTemplate.value) return;
    bootstrapModal = createModal(modalTemplate.value, emit, 'static', false, true);
});

const resolve = (confirm: boolean) => {
    props.modal.resolver(confirm);
    bootstrapModal.hide();
};
</script>
