import YfTest from './test.vue';

YfTest.install = app => {
  app.component(YfTest.name, YfTest);
}

export default YfTest;