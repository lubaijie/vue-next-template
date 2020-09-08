<template>
  <div ref="root">
    <a-button @click="t">测试</a-button>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue'
  // import { Loading } from 'element-ui';
  // import { message } from 'ant-design-vue'
  // import { useStore } from 'vuex'
  import { test } from '@/api/test'
  // import { notification } from 'ant-design-vue'

  export default {
    setup() {
      const root = ref(null);

      // const store = useStore();

      onMounted(() => {
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

      return {
        root,
        t
      }
    }
  }
</script>