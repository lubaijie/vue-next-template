<template>
<div style="height: 100%;">
  <a-layout style="height: 100%;">
    <a-layout-sider collapsed-width="0" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <!-- <div class="header-container">
        <div class="header-pic" />
        <div class="userinfo-container">
          <div class="userinfo-name">李二蛋</div>
          <div class="userinfo-job">总经理</div>
        </div>
      </div> -->
      <logo fontSize="45px" />
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
import MoveMenu from '../MoveMenu/index';
import Logo from '../logo.vue'

export default defineComponent({
  name: 'NavSide',
  components: {
    MoveMenu,
    Logo
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

<style lang="scss" scoped>
.header-container{
  margin: 15px 15px;
  .header-pic{
    display: inline-block;
    width: 60px;
    height: 60px;
    border: 1px solid #fff;
    border-radius: 50%;
    background-color: #fff;
    background-image: url('../../assets/images/header.jpg');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .userinfo-container{
    display: inline-block;
    color: #fff;
    width: calc(100% - 60px);
    vertical-align: top;
    .userinfo-name{
      font-size: 20px;
      font-weight: 800;
      font-family: Avenir, Helvetica, Arial, sans-serif;
    }
    .userinfo-job{

    }
  }
}
</style>
