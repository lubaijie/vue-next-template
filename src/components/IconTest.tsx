import { defineComponent } from 'vue';
import Icon from '@ant-design/icons-vue';

import app from '@/assets/icons/svg/app.svg'

export default defineComponent({
  name: 'AppIcon',
  components: { Icon }
  setup() {
    return () => (
      <icon v-on:component={app} />
    )
  }
})