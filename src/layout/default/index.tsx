import { defineComponent, provide, ref } from "vue";
import { RouterView } from 'vue-router';
import './style/index.scss';

import Menu from './components/menu';
import Logo from './components/logo';

const DefaultLayOut = defineComponent({
  setup() {
    
    const collapsed = ref(true);
    provide('collapsed', collapsed);
    const openSider = () => {
      if (collapsed.value) collapsed.value = false;
    };
    const closeSider = () => {
      if (!collapsed.value) collapsed.value = true;
    }

    return () => (
        <a-layout id="defaultlayout" style="height: 100%;">
          <a-layout-sider class="layout-sider" 
            v-model={[collapsed.value, 'collapsed']} 
            trigger={null} 
            collapsible 
            collapsedWidth={80}
            onMouseover={openSider} 
            onMouseleave={closeSider}
            style={{color: "#fff"}}>
              <Logo />
              <Menu />
          </a-layout-sider>
          <a-layout>
            <div class="layout-content">
              <a-layout-header style="background-color: #fff; padding: 0">
                <div>header</div>
              </a-layout-header>
              <a-layout-content class="main-container">
                <RouterView />
              </a-layout-content>
            </div>
          </a-layout>
        </a-layout> 
    )
  }
});

export default DefaultLayOut;