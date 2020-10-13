import { defineComponent, ref, watch, inject } from 'vue';
import router from '@/router/index';
import '../style/menu.scss';


export default defineComponent({
  name: 'LeftMenu',
  setup() {
    const collapsed: any = inject('collapsed');
    const selectedKeys = ref(['1']);
    const openKeys = ref(['sub1']);
    let preOpenKeys = ['sub1'];
    watch(openKeys, (val, oldVal) => {
      preOpenKeys = oldVal;
    });
    watch(collapsed, val => {
      openKeys.value = val ? [] : preOpenKeys;
    })


    const { options } = router;
    const routerDatas = options.routes;
    const createMenu = (routers: object[], keyCode) => {
      return routers.map((item: any, index) => {
        if (!item.hidden) {
          let iconElement: JSX.Element | null = null
          if (item.meta.icon !== null && item.meta.icon !== '') {
            iconElement = <div class="menu-icon-container"><svg-icon iconClass={item.meta.icon} class="menu-icon" /></div>
          }
          const titleElement = <span class="menu-title">{item.meta.title !== null && item.meta.title !== '' ? item.meta.title : item.name}</span>
          // const subMenu = routers === routerDatas ? (collapsed.value ? <div>{iconElement}</div> : <div>{iconElement}{titleElement}</div>) : <div>{titleElement}</div>
          const subMenu = collapsed.value ? <div>{iconElement}</div> : <div>{iconElement}{titleElement}</div>
          if (item.children) {
            return (
              <a-sub-menu key={keyCode + index} title={subMenu}>
                {createMenu(item.children, index + '')}
              </a-sub-menu>
            )
          } else {
            return (
              <a-menu-item key={keyCode + index}>
                <router-link to={item.path}>{subMenu}</router-link>
              </a-menu-item>
            )
          }
        }
      })
    };

    return () => (
      <div class="menu-container">
        <a-menu 
          style="text-align: left"
          vModel_openKeys={openKeys.value}
          vModel_selectedKeys={selectedKeys.value}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed.value}>
            {
              createMenu(routerDatas, '')
            }
        </a-menu>
      </div>
    )
  }
});