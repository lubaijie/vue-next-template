Tab 1Tab 2Tab 3
Content of Tab Pane 1
基本用法 #
默认选中第一项。

<template>
  <div>
    <a-tabs @change="callback">
      <a-tab-pane key="1" tab="Tab 1">
        <a-input v-model:value="value" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2" force-render>
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3">
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: ''
    };
  },
  methods: {
    callback(key) {
      console.log(key);
    },
  },
};
</script>