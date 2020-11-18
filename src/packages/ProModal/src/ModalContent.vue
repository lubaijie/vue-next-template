<template>
  <div>
    <slot />
    <el />
  </div>
</template>

<script lang="ts">
import { h } from 'vue'
export default {
  name: 'ModalContent',
  setup() {
    const el = h('div',{},['测试']);

    console.log(el);

    return {el}
  }
}
</script>