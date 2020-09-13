import axios from 'axios';
// import router from '@/router';
import config from '@/config';
import { getToken } from './auth';
import { notification }  from 'ant-design-vue'
import loading from '@/components/Loading/service';
import store from '@/store'

let loadingRequestCount = 0;

const showLoading = () => {
  const isLoading = (store.state as any).system.isLoading;
  if (isLoading) {
    if (loadingRequestCount === 0) {
      loading.open({ text: '拼命加载中...' });
    }
    loadingRequestCount++;
  } else {
    store.dispatch('system/IsLoading', true);
  }
}

const hideLoading = () => {
  if (loadingRequestCount <= 0) return ;
  loadingRequestCount--;
  if (loadingRequestCount === 0) {
    loading.close();
  }
}


// 创建axios实例
const service = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_API : '/',
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: config.timeOut // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = getToken();
    }
    config.headers['Content-Type'] = 'application/json';

    // 请求拦截进来调用显示loading效果
    showLoading();

    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {

    // 关闭loading
    hideLoading();
    
    const code = response.status;
    if (code < 200 || code > 300) {
      notification.error({
        message: response.data,
        description: response.status
      })
      return Promise.reject('error');
    } else {
      return response.data
    }
  },
  error => {
    // 关闭loading
    hideLoading();

    let code = 0;
    try {
      code = error.response.data.status;
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        notification.error({
          message: '请求超时',
          description: 500
        })
        return Promise.reject(error);
      }
    }
    if (code) {
      if (code === 401) {
        // 登录超时，返回用户登录界面
      } else if (code === 403) {
        // 401
      } else {
        notification.error({
          message: '系统错误',
          description: code
        })
      }
    }else {
      notification.error({
        message: '接口请求失败',
        description: 500
      })
    }
    return Promise.reject(error);
  }
)

export default service;