import { defineComponent, inject } from 'vue';
import router from '@/router/index';
import '../style/menu.scss';
import { AppRouteRecordRaw } from '@/router/types';


export default defineComponent({
  name: 'Menu',
  setup() {
    const collapsed: any = inject('collapsed');
    // const selectedKeys = ref(['/test']);
    // const openKeys = ref([router.currentRoute.value.fullPath]);
    // let preOpenKeys = [router.currentRoute.value.fullPath];

    // watch(openKeys, (val, oldVal) => {
    //   preOpenKeys = oldVal;
    // });
    // watch(collapsed, val => {
    //   openKeys.value = val ? [] : preOpenKeys;
    // });
    const { options } = router;
    const routerDatas = options.routes;
    const createMenu = (routers: AppRouteRecordRaw[]) => {
      return routers.map((item: AppRouteRecordRaw) => {
        if (!item.meta.hidden) {
          let iconElement: JSX.Element | null = null
          if (item.meta.icon !== null && item.meta.icon !== '') {
            iconElement = <div class="menu-icon-container"><svg-icon iconClass={item.meta.icon} class="menu-icon" /></div>
          }
          const titleElement = <span class="menu-title">{item.meta.title !== null && item.meta.title !== '' ? item.meta.title : item.name}</span>
          // const subMenu = routers === routerDatas ? (collapsed.value ? <div>{iconElement}</div> : <div>{iconElement}{titleElement}</div>) : <div>{titleElement}</div>
          const subMenu = collapsed.value ? <div>{iconElement}</div> : <div>{iconElement}{titleElement}</div>
          if (item.children) {
            return (
              <a-sub-menu key={item.fullPath} title={subMenu}>
                {createMenu(item.children)}
              </a-sub-menu>
            )
          } else {
            return (
              <a-menu-item key={item.fullPath}>
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
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed.value}>
            {
              createMenu(routerDatas as AppRouteRecordRaw[])
            }
        </a-menu>
      </div>
    )
  }
});