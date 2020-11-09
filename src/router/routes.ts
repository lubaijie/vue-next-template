import layout from '@/layout/index'
import transit from '@/views/transit.vue'
import { v4 as uuid } from 'uuid';
import { AppRouteRecordRaw } from './types';


const routes: Array<AppRouteRecordRaw> = [
  {
    key: uuid(),
    path: '/system',
    name: 'System',
    component: layout,
    meta: { title: '系统', icon: 'System' },
    children: [
      {
        key: uuid(),
        path: '/system/data',
        name: 'SystemData',
        component: transit,
        meta: { title: '数据', icon: 'data' },
        children: [
          {
            key: uuid(),
            path: '/system/data/table',
            name: 'SystemDataTable',
            meta: { title: '数据表', icon: 'table' },
            component: () => import('@/views/system/data/table')
          }
        ]
      }      
    ]
  },
  {
    key: uuid(),
    path: '/',
    name: 'Index',
    component: layout,
    meta: { title: '首页', icon: 'all' },
    children: [
      {
        key: uuid(),
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: { title: '首页', icon: 'all' }
      },
      {
        key: uuid(),
        path: '/test',
        name: 'Test',
        component: () => import('@/views/test.vue'),
        meta: { title: '测试1', icon: 'all' },
      },
      {
        key: uuid(),
        path: '/test2',
        name: '测试2',
        component: () => import('@/views/test2'),
        meta: { title: '测试2', icon: 'all' }
      }
    ]
  },
  {
    key: uuid(),
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    meta: { title: '登录', icon: 'test', hidden: true },
  }
]

export default routes;