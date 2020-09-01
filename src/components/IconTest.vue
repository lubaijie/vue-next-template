<template>
<icon :component="app" />
</template>

<script lang="ts">
import {
  defineComponent,
  markRaw
} from 'vue';
import Icon from '@ant-design/icons-vue';

// import app from '@/assets/icons/svg/app.svg';

export default defineComponent({
  name: 'AppIcon',
  components: {
    Icon
  },

  setup() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const app = markRaw(require('@/assets/icons/svg/app.svg'));
    return {
      app
    }
  }
})
</script>
