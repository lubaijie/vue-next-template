<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <a-button type="primary">
      Primary
    </a-button>
    <test />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import test from '@/components/test'

export default defineComponent({
  components: { HelloWorld, test }
})
</script>
