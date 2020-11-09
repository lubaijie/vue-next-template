import { defineComponent } from 'vue';
import '../style/header.scss';

import MenuSearch from '@/layout/MenuSearch';

export default defineComponent({
  name: 'DefaultLayOutHeader',
  setup() {
    return () => (
      <div class="header-container">
        <MenuSearch />
      </div>
    )
  }
})