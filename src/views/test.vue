<template>
<div ref="root">
  <a-button @click="ceshi">测试</a-button>
  <RotateSquare2 />
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
import {
  open
} from '@/components/Loading/service.tsx'

import { RotateSquare2 } from 'vue-loading-spinner'

export default defineComponent({
  components: {
    RotateSquare2
  },
  setup() {
    const root = ref(null);

    // const store = useStore();

    onMounted(() => {
      const div = document.createElement('div');
      console.log(typeof(div));
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
      console.log(open());
    }

    return {
      root,
      t,
      ceshi
    }
  }
})
</script>
