import { defineComponent, ref, Transition } from 'vue';
import '@/style/test.scss';

const isFade = ref(true);



const test2 = defineComponent({
  name: 'Test2',
  directives: {
    fade: {
      mounted(el) {
        console.log(el);
      },
      beforeUnmount(el){
        console.log(el);
        console.log('卸载');
      }
    }
  },
  setup() {

    return () => (
      <div>
        <a-button>测试2</a-button>
        <Transition name="fade">
          {isFade.value ? <div v-fade>显示</div> : null}
        </Transition>
      </div>     
    )
  }
})

export default test2;