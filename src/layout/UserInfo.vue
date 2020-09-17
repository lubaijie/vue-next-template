<template>
  <div class="userinfo-container">
    <div class="userinfo-header" :style="props.collapsed ? { transform: 'scale(0.75)' } : { transform: 'scale(1)' }" />
    <div class="userinfo" v-if="!props.collapsed">
      <div class="userinfo-name">李二蛋</div>
      <div class="userinfo-job">
        <div class="userinfo-job-item">前端工程师</div>
        <div class="userinfo-job-item">蚂蚁金服</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'UserInfo',
  props: {
    collapsed: {
      type: Boolean,
      default: false
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
.userinfo-container{
  display: grid;
  justify-items: center;
  margin: 10px auto;
  .userinfo-header{
    width: 60px;
    height: 60px;
    border: 1px solid #fff;
    border-radius: 50%;
    background-color: #fff;
    background-image: url('../assets/images/header.jpg');
    background-repeat: no-repeat;
    background-size: contain;

    transition: transform .5s;
  }
  .userinfo{
    color: #fff;
    margin-top: 10px;
    width: 100%;
    padding: 0 5px;
    .userinfo-name{
      font-size: 16px;
      font-weight: 800;
      letter-spacing: 2px;
    }
    .userinfo-job{
      margin-top: 10px;
      &-item{
        display: inline-block;
        padding: 0 10px;
        width: 50%;
   
        overflow:hidden; 
        text-overflow:ellipsis; 
        white-space:nowrap; 
      }
    }
  }
}
</style>