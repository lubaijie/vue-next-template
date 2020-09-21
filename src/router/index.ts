import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes';
import Nprogress from 'nprogress';
import Config from '@/config';
import store from '@/store'


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + '-' + Config.title;
  }
  Nprogress.start();

  const myStore = store.state as any;
  if (myStore.user.token) {
    console.log('OK!');
  } else {
    console.log('NO!');
  }
  next();
})

export default router
