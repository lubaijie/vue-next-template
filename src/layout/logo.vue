<template>
  <div class="logo-container">
    <svg-icon :icon-class="props.type" :style="{ fontSize: props.fontSize }" />
    <div class="title">YunFly</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    fontSize: {
      type: String,
      default: '36px'
    },
    type: {
      type: String,
      default: 'logo-w'
    }
  },
  setup(props) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.logo-container{
  margin: 15px 10px;
  cursor: pointer;
  .title{
    display: inline-block;
    margin: auto 10px auto 20px;
    color: #fff;
    letter-spacing: 2px;
    font-weight: 600;
    font-size: 26px;
    vertical-align: bottom;
  }
}
</style>