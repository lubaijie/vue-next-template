import { RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index'
import transit from '@/views/transit.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: 'System',
    component: layout,
    meta: { title: '系统', icon: 'System' },
    children: [
      {
        path: '/system/data',
        name: 'SystemData',
        component: transit,
        meta: { title: '数据', icon: 'data' },
        children: [
          {
            path: '/system/data/table',
            name: 'SystemDataTable',
            meta: { title: '数据表', icon: 'System' },
            component: () => import('@/views/system/data/table')
          }
        ]
      }      
    ]
  },
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
        component: () => import('@/views/test.vue'),
        meta: { title: '测试1', icon: 'all' },
      },
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
    meta: { title: '登录', icon: 'test', hidden: true },
  }
]

export default routes;