<template>
    <div class="fade m-2 toast" :class="[`bg-${toast.variant}`, toast.show ? 'show' : 'hide']" style="z-index: 9999">
        <div class="border-bottom-0 toast-header">
            <button class="btn-close m-auto me-2" @click="emit('hide')" />
        </div>

        <div class="toast-body" style="background-color: rgba(255, 255, 255, 0.5)">
            {{ toast.message }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type {Toast} from './types';

defineProps<{toast: Toast}>();

const emit = defineEmits<{
    hide: [void];
}>();
</script>
