<template>
<div id="app">
  <router-view />
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const isMobile = () => {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }

    const store = useStore();

    onMounted(() => {
      if (isMobile()) {
        store.dispatch('app/device', 'mobile');
      } else {
        store.dispatch('app/device', 'pc');
      }
    });
  }
})
</script>


