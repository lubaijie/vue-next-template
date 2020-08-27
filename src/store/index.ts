import { createStore } from 'vuex'

const modulesFiels = require.context('./modules', true, /\.ts$/);

const modules = modulesFiels.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiels(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {})

export default createStore({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  // modules: {
  //   // modules
  // }
  modules
})
