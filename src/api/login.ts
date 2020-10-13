import request from '@/utils/request';

// 登录
export function login(params) {
  return request({
    url: 'auth/login',
    method: 'post',
    data: params
  })
}