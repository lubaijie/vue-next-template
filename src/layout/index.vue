<template>
  <div style="height: 100%">
    <nav-side />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavSide from './NavSide/index.vue';
export default defineComponent({
  name: 'LayOut',
  components: { NavSide }
})
</script>