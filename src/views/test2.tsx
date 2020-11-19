import { defineComponent, ref } from 'vue';
import { ProModal } from '@/packages/ProModal';

export default defineComponent({
  setup() {

    const visibleRef = ref<boolean>(false);

    return () => (
      <>
        <a-button onClick={() =>visibleRef.value = true }>打开</a-button>
        <ProModal 
          visible={visibleRef.value} 
          title="测试" 
          onCancel={() => visibleRef.value = false}
          width="300px"
          destroyOnClose={true}
          titleProps={{ showHelper: true, helperText: '测试' }}
        >22222222222</ProModal>
      </>
    )
  }
})