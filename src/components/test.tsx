import { defineComponent, onMounted } from 'vue';

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

    
    
    return () => (
      <div style="color: red;">
        <div id='mountNode' />
        {/* <div>{content}</div> */}
      </div>
    )
  }
})
