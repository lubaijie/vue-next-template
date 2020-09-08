<template>
<div class="login-container">
  <div class="title-container">
    <img class="logo" src="@/assets/logo.svg" />
    <div class="title">{{ title }}</div>
  </div>
  <div class="panel-container">
    <login-panel />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue';
import config from '@/config/index'

import LoginPanel from './components/LoginPanel.vue';

export default defineComponent({
  name: 'Login',

  components: {
    LoginPanel
  },

  setup() {

    const title = config.title;

    return {
      title
    }
  }
})
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  background-color: #f0f2f5;
  background-image: url('../../assets/background.svg');
  padding-top: 10%;

  .title-container {
    .logo {
      height: 60px;
    }

    .title {
      display: inline-block;
      font-size: 38px;
      font-weight: bold;
      vertical-align: middle;
      margin-left: 15px;
    }
  }

  .panel-container {
    margin-top: 50px;
  }
}
</style>
