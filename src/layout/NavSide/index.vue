<template>
<div style="height: 100%;">
  <a-layout style="height: 100%;">
    <a-layout-sider collapsed-width="0" v-model:collapsed="collapsed" :trigger="null" collapsible>
      123
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        1223
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
  <move-menu />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive
} from 'vue';
import MoveMenu from '../MoveMenu/index'
export default defineComponent({
  name: 'NavSide',
  components: {
    MoveMenu
  },
  setup() {

    const collapsed = ref(false);
    const selectedKeys = reactive(['1']);

    let screenWidth = document.body.clientWidth;
    let timer = true;
    window.onresize = () => {
      if (timer) {
        screenWidth = document.body.clientWidth;

        collapsed.value = screenWidth < 1350;

        timer = false;
        setTimeout(() => {
          timer = true;
        }, 400);
      }
    }

    return {
      collapsed,
      selectedKeys
    }
  }
})
</script>
