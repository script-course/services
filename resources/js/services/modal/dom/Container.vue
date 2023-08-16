<template>
    <component
        :is="modal.component"
        v-for="(modal, index) in modals"
        :key="index"
        :modal="modal.modal"
        @hide="deleteModal(index)"
    />
</template>

<script setup lang="ts">
import {modals} from '../data';

const deleteModal = (index: number) => modals.value.splice(index);
</script>

<style>
.modal + .modal {
    z-index: 1102 !important;
}

.modal + .modal + .modal {
    z-index: 1104 !important;
}

.modal-backdrop.show + .modal-backdrop.show {
    z-index: 1101 !important;
}

.modal-backdrop.show + .modal-backdrop.show + .modal-backdrop.show {
    z-index: 1103 !important;
}
</style>
