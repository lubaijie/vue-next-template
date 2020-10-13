import { defineComponent, inject, Transition } from 'vue';
import '../style/logo.scss';

import Config from '@/config';

export default defineComponent({
  setup() {
    const collapsed: any = inject('collapsed');
    return () => (
      <div class="logo-container">
        <img class="logo-img" src="/img/logo.svg" />
        <Transition name="fade">
          {collapsed.value ? null : <div class="logo-title">{Config.title}</div>}
        </Transition>
      </div>
    )
  }
})