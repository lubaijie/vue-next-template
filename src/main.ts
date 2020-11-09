import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import './assets/icons/index.js';
import SvgIcon from '@/components/SvgIcon/index.vue';

const app = createApp(App);

app.component('svg-icon', SvgIcon);

app.use(store).use(router).use(antd).mount('#app');

export { app };
