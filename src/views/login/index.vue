<template>
<div class="login-container">
  <div class="title-container">
    <img class="logo" src="@/assets/logo.svg" />
    <div class="title">{{ title }}</div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue';

// class Login {

// }

export default defineComponent({
  name: 'Login',

  setup() {

    const title = 'Ant Design';

    return {
      title
    }
  }
})
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
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
}
</style>
