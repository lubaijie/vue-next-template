import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import antd from 'ant-design-vue';
import 'ant-design-vue/components/style'

createApp(App).use(store).use(router).use(antd).mount('#app')
