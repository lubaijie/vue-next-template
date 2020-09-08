<template>
<!--全局组件loading开发-->
<transition name="custom-loading-fade">
  <!--loading蒙版-->
  <div v-show="visible" class="loading-mask">
    <div>
      <p>{{ text }}</p>
    </div>
  </div>
</transition>
</template>

<script>
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'loading',
  setup() {
    return {
      text: 'ceshiceshi',
      visible: true
    }
  }
})
</script>

<style lang="scss" scoped>
.loading-mask {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5200;
}
</style>
