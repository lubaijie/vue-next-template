import { defineComponent } from "vue";
import DefaultLayOut from './default';

const LayOut = defineComponent({
  setup() {
    return () => (
      <div>
        <DefaultLayOut />
      </div>
    )
  }
});

export default LayOut;