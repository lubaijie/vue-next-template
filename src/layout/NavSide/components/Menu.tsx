import { defineComponent, ref, watch } from 'vue'
import router from '@/router/index'
import '../style/index.scss'


export default defineComponent({
  name: 'LeftMenu',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const selectedKeys = ref(['1']);
    const openKeys = ref(['sub1']);
    let preOpenKeys = ['sub1'];
    watch(openKeys, (val, oldVal) => {
      preOpenKeys = oldVal;
    });
    watch(props, val => {
      openKeys.value = val.collapsed ? [] : preOpenKeys;
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
          const subMenu = routers === routerDatas ? (props.collapsed ? <div>{iconElement}</div> : <div>{iconElement}{titleElement}</div>) : <div>{titleElement}</div>
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
          inlineCollapsed={props.collapsed}>
            {
              createMenu(routerDatas, '')
            }
        </a-menu>
      </div>
    )
  }
});