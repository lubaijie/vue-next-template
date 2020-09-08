const state = {
  isLoading: true
};

const mutations = {
  ISLOADING: (state, value) => {
    state.isLoading = value;
  }
};

const actions = {
  IsLoading({ commit }, value) {
    commit('ISLOADING', value);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}