import Cookies from 'js-cookie';
import config from '@/config';

const tokenKey = config.tokenKey;

export function getToken() {
  return Cookies.get(tokenKey);
}

export function setToken(token: string, rememberMe: boolean) {
  if (rememberMe) {
    return Cookies.set(tokenKey, token, { expires: config.tokenCookieExpires });
  } else {
    return Cookies.set(tokenKey, token);
  }
}

export function removeToken() {
  return Cookies.remove(tokenKey);
}