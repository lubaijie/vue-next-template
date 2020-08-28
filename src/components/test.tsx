import { defineComponent, onMounted } from 'vue';

import gd from './gd'

export default defineComponent ({
  name: 'Test',

  

  setup() {
    onMounted(() => {
      gd.init();
    })
    
    return () => (
      <div style="color: red;">
        <div id='mountNode' />
      </div>
    )
  }
})
