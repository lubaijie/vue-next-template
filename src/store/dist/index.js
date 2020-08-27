"use strict";
exports.__esModule = true;
var vuex_1 = require("vuex");
var modulesFiels = require.context('./modules', true, /\.ts$/);
var modules = modulesFiels.keys().reduce(function (modules, modulePath) {
    var moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    var value = modulesFiels(modulePath);
    modules[moduleName] = value["default"];
    return modules;
}, {});
exports["default"] = vuex_1.createStore({
    // state: {
    // },
    // mutations: {
    // },
    // actions: {
    // },
    // modules: {
    //   // modules
    // }
    modules: modules
});
