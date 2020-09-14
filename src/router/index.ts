import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: layout,
    meta: { title: '首页' },
    children: [
      {
        path: '/',
        name: 'Home',
        component: import('../views/Home.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/test.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
