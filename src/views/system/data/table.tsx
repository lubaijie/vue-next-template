import { defineComponent } from "vue";
import GG from '@/components/test';


const SystemDataTable = defineComponent({
  setup() {
    // const mountNode: any = ref();

    return () => (
      <div><GG /></div>
    )
  }
});

export default SystemDataTable;