"use strict";
exports.__esModule = true;
var state = {
    device: 'pc'
};
var mutations = {
    DEVICE: function (state, type) {
        state.device = type;
    }
};
var actions = {
    device: function (_a, type) {
        var commit = _a.commit;
        commit('DEVICE', type);
    }
};
exports["default"] = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions
};
