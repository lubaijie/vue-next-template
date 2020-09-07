import { defineComponent, onMounted, ref } from 'vue';

import gd from './gd'

interface TestProps {
  content: string;
}

export default defineComponent ({
  name: 'Test',

  props: {
    content: String
  },
  

  setup(props) {

    // const { content } = props;
    onMounted(() => {
      console.log(props.content);
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
