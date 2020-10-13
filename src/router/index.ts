import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes';
import Nprogress from 'nprogress';
import Config from '@/config';
import store from '@/store';

// import { getToken } from '@/utils/auth';


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
    if (to.path === '/login') {
      next({ path: '/' });
      Nprogress.done();
    } else {
      // 判断用户是否拉取菜单
      next();
    }
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next(`/login?redirect=${to.fullPath}`);
    }
  }
})

export default router
