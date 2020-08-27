const state = {
  device: 'pc'
};

const mutations = {
  DEVICE: (state, type) => {
    state.device = type;
  }
};

const actions = {
  device({ commit }, type) {
    commit('DEVICE', type)
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}