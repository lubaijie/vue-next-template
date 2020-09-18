<template>
<div ref="root">
  <a-button @click="t">测试</a-button>
  <div class="test">
    <div style="height: 400px">123433234</div>
  </div>
</div>
</template>

<script>
import {
  ref,
  onMounted,
  defineComponent
} from 'vue'
// import { Loading } from 'element-ui';
// import { message } from 'ant-design-vue'
// import { useStore } from 'vuex'
import {
  test
} from '@/api/test'
// import { notification } from 'ant-design-vue'
import loading from '@/components/Loading/service.tsx'

export default defineComponent({
  setup() {
    const root = ref(null);

    // const store = useStore();

    onMounted(() => {
      // const div = document.createElement('div');
      // console.log(typeof(div));
      // Loading.service({ background: 'rgba(0, 0, 0, 0.4)', spinner: 'el-icon-loading', text: '拼命加载中...' });
      // console.log(store.state.system.isLoading);
      // store.dispatch('system/IsLoading', false);
      // console.log(store.state.system.isLoading);
    })

    const t = () => {
      test().then(res => {
        console.log(res)
      })
    }

    const ceshi = () => {
      loading.open({
        text: '拼命加载中...'
      });
    }

    return {
      root,
      t,
      ceshi
    }
  }
})
</script>

<style lang="scss">
.test{
  height: 200px;
  overflow: auto;
  overflow-y: scroll;
  scrollbar-color: transparent transparent;
  scrollbar-track-color: transparent;
  -ms-scrollbar-track-color: transparent;
  &::-webkit-scrollbar { width: 0 !important }
  // &::-webkit-scrollbar {
  //   width: 8px;
  //   height: 8px;
  // }

  // &::-webkit-scrollbar-thumb {
  //   border-radius: 8px;
  //   background-color: hsla(220, 4%, 58%, 0.3);
  //   transition: background-color 0.3s;

  //   &:hover {
  //     background: #bbb;
  //   }
  // }

  // &::-webkit-scrollbar-track {
  //   background: #ededed;
  // }
}
</style>
