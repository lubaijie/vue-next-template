import { defineComponent, ref, Teleport } from 'vue';

const node: any = ref(null);

const test = () => {
  if (node.value === null) {
    node.value = <Teleport to="body"><div>测试</div></Teleport>
  } else {
    node.value = null;
  }
}

const test2 = defineComponent({
  setup() {
    return () => (
      <div>
        <a-button onClick={test}>测试2</a-button>
        {node.value}
      </div>     
    )
  }
})

export default test2;