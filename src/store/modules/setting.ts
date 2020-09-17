const state = {
  collapsed: false
};

const mutations = {
  Collapsed: (state, value) => {
    state.collapsed = value;
  }
};

const actions = {
  Collapsed({ commit }, value) {
    commit('Collapsed', value);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}