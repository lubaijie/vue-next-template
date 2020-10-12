import { RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index'
import transit from '@/views/transit.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: layout,
    meta: { title: '首页', icon: 'all' },
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: { title: '首页', icon: 'all' }
      },
      {
        path: '/test',
        name: 'Test',
        component: transit,
        meta: { title: '测试', icon: 'all' },
        children: [
          {
            path: '/test',
            name: 'Test',
            component: transit,
            meta: { title: '测试', icon: 'test' },
            children: [
              {
                path: '/test',
                name: 'Test',
                component: () => import('@/views/test.vue'),
                meta: { title: '测试', icon: 'test' }
              }
            ]
          },
          {
            path: '/about',
            name: 'About',
            component: () => import('@/views/About.vue'),
            meta: { title: '关于', icon: 'test' }
          }
        ]
      }
    ]
  }, 
  {
    path: '/test2',
    name: 'Test2',
    component: layout,
    meta: { title: '测试2', icon: 'all' },
    children: [
      {
        path: '/test2',
        name: '测试2',
        component: () => import('@/views/test2'),
        meta: { title: '测试2', icon: 'all' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    meta: { title: '登录', icon: 'test' }
  }
]

export default routes;