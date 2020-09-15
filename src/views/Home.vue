<template>
<div class="home">
  <img alt="Vue logo" src="../assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  <!-- <HomeOutlined /> -->
  <IconTest />
</div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import IconTest from '@/components/IconTest.vue'

// import {
//   HomeOutlined
// } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    HelloWorld,
    // HomeOutlined,
    IconTest
  }
})
</script>
