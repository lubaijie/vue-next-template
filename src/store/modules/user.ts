import { login } from '@/api/login'
import { getToken, setToken } from '@/utils/auth';

const state = {
  token: getToken(),
  roles: [],
  user: null,
};

const mutations = {
  TOKEN: (state, value) => {
    state.token = value;
  },
  ROLES: (state, value) => {
    state.roles = value;
  },
  USER: (state, value) => {
    state.user = value;
  }
};

const actions = {
  token({ commit }, value) {
    commit('TOKEN', value);
  },
  Login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then((res: any) => {
        if (res.status) {
          commit('TOKEN', res.data.token);
          commit('ROLES', res.data.user.roles);
          commit('USER', res.data.user.user);
          setToken(res.data.token, true);
          resolve(null);
        } else {
          reject(res.msg);
        }
      }).catch(error => {
        reject(error);
      })
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}