import { defineComponent } from 'vue';
import '../style/header.scss';

import SearchMenu from './search';

export default defineComponent({
  name: 'DefaultLayOutHeader',
  setup() {
    return () => (
      <div class="header-container">
        <SearchMenu />
      </div>
    )
  }
})