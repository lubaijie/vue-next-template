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
    
    // 根据输入更新options数据
    const perOption = optionsRef.value;
    watchEffect(() => {
      if (keyWordRef.value.trim() === ''){
        optionsRef.value = perOption;
      } else {
        optionsRef.value = perOption.filter(item => {
          return (item.value as string).indexOf(keyWordRef.value) >= 0;
        });
      }
    })
    
    // 打开关闭搜索框动画
    const switchInput = ref<boolean>(false);
    const inputStyle = ref<CSSProperties>({width: '50px'})
    function displayBlock() {
      switchInput.value = true;  
      setTimeout(() => {
        inputStyle.value = { width: '200px' };
      },10)
    }
    function displayNone() {
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
            placeholder="菜单搜索"
            autofocus={switchInput.value}
            v-model={[keyWordRef.value, 'value']}
            options={optionsRef.value}
            onBlur={displayNone}
            onSelect={direct}
            v-slots={{
              default: () => <a-input 
                class="search-text"
                allowClear
                v-slots={{
                  prefix: () => <SearchOutlined class="icon" />
                }} />
            }}
          />
          : <SearchOutlined class="search-icon" onClick={displayBlock} />
        }      
      </div>
    )
  }
});

export default MenuSeach;