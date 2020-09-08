import { createApp, defineComponent } from 'vue';
import loading from './loading.vue';


const name = 'zhangsan'
const app = createApp(defineComponent({
  setup(){
    const name = '张曼'
    return () => (
    <div>测试机哦{name}</div>
    )
  }
}));

export function open() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  app.mount(div);
}

