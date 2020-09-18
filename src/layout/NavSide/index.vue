<template>
<div style="height: 100%;">
  <a-layout style="height: 100%;">
    <a-layout-sider :collapsed-width="collapsedWidth" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <user-info :collapsed="collapsed" />
      <c-menu :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <component 
          v-if="collapsedWidth > 0"
          :is="collapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'" 
          class="trigger"
          @click="() => (collapsed = !collapsed)"/>
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
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import MoveMenu from '../MoveMenu/index';
import UserInfo from '../UserInfo.vue'
import CMenu from './components/Menu';

export default defineComponent({
  name: 'NavSide',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    MoveMenu,
    UserInfo,
    CMenu
  },
  setup() {

    const collapsed = ref(false);
    const collapsedWidth = ref(80);
    const selectedKeys = reactive(['1']);

    let screenWidth = document.body.clientWidth;
    let timer = true;
    window.onresize = () => {
      if (timer) {

        screenWidth = document.body.clientWidth;

        collapsed.value = screenWidth < 1350;
        
        collapsedWidth.value = screenWidth < 1100 ? 0 : 80;

        timer = false;
        setTimeout(() => {
          timer = true;
        }, 400);
      }
    }

    return {
      collapsed,
      collapsedWidth,
      selectedKeys
    }
  }
})
</script>

<style lang="scss" scoped>
.trigger{
  font-size: 24px;
  float: left;
  line-height: 70px;
  margin-left: 15px;
  :hover{
    color: #1890ff;
  }
}
</style>
