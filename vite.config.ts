import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import {defineConfig} from 'vite';

import {resolve} from './vite/resolve.config';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue(),
    ],
    build: {target: 'esnext'},
    resolve,
});
