import { defineComponent, onMounted, ref } from 'vue';
import '@/style/test.scss';

import gd from './gd'

export default defineComponent ({
  name: 'Test',

  props: {
    content: String
  },
  

  setup() {

    // const { content } = props;
    onMounted(() => {
      // console.log(props.content);
      gd.init();
    })

    const value = ref('');

    
    
    return () => (
      <div style="color: red;">
        <div id='mountNode' />
        <a-input v-model={value} />
      </div>
    )
  }
})
