import {createApp} from 'vue';

import Container from './dom/Container.vue';

const app = createApp(Container);

const modalContainer = document.createElement('div');
document.body.appendChild(modalContainer);

app.mount(modalContainer);
