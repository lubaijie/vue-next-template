import { defineComponent, ref } from "vue";

const MenuSeach = defineComponent({
  name: 'MenuSearch',
  setup() {
    const valueRef = ref<string>(''); 
    const options = ref([{ value: 'abc', text: '123' }, { value: 'def', text: '456' }, { value: 'ghu', text: '789' }]);
    return () => (
      <a-auto-complete
        v-model={[valueRef.value, ['value']]}
        options={options.value}
        style='width: 200px'
        placeholder='搜索'
        >
          
        </a-auto-complete>
    )
  }
});

export default MenuSeach;