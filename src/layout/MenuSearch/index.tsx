import { CSSProperties, defineComponent, ref, watchEffect } from "vue";
import { SearchOutlined } from '@ant-design/icons-vue';
import './index.scss';
import router from '@/router';
import { RouteRecordRaw } from 'vue-router';
import { DataSourceItemType } from './types';

const MenuSeach = defineComponent({
  name: 'MenuSearch',
  setup() {
    
    const keyWordRef = ref<string>(''); 

    // 设置options
    const { options } = router;
    const routerDatas = options.routes;
    const optionsRef = ref<Array<DataSourceItemType>>([]);
    function orderOption(routerList: Array<RouteRecordRaw>) {
      routerList.forEach(item => {
        if (item.children) {
          orderOption(item.children);
        } else {
          if (!item.meta?.hidden)
            optionsRef.value.push({ value: item.meta?.title as string, text: item.path })
        }
      })
    }
    orderOption(routerDatas);

    watchEffect(() => {
      if (keyWordRef.value.trim() === ''){
        optionsRef.value = [];
        orderOption(routerDatas);
      } else {
        optionsRef.value = optionsRef.value.filter(item => {
          return (item.value as string).indexOf(keyWordRef.value) < 0;
        });
      }
    })
    
    // 打开关闭搜索框动画
    const switchInput = ref<boolean>(false);
    const inputStyle = ref<CSSProperties>({width: '50px'})
    function displayNone() {
      switchInput.value = true;  
      setTimeout(() => {
        inputStyle.value = { width: '200px' };
      },10)
    }
    function displayBlock() {
      inputStyle.value = { width: '50px' };
      setTimeout(() => {
        switchInput.value = false;
      },200)
    }

    // 跳转到选择的菜单路由
    function direct(value, op) {
      router.push(op.text);
    }


    return () => (
      <div class="search-conatiner">
        {
          switchInput.value ? 
          <a-auto-complete
            class="search-input"
            style={inputStyle.value}
            placeholder="搜索"
            autofocus={switchInput.value}
            value={keyWordRef.value}
            options={optionsRef.value}
            onChange={e => keyWordRef.value = e}
            onBlur={displayBlock}
            onSelect={direct}
          />
          : <SearchOutlined class="search-icon" onClick={displayNone} />
        }
        
      </div>
    )
  }
});

export default MenuSeach;