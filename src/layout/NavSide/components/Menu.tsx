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
    console.log(routerDatas);
    const createMenu = (routers: object[], keyCode) => {
      return routers.map((item: any, index) => {
        if (!item.hidden) {
          if (item.children) {
            let iconNode: JSX.Element | null = null;
            if (item.meta.icon) {
              iconNode = <svg-icon iconClass={item.meta.icon} class="menu-icon" />
            }

            let titleNode: JSX.Element | null = null;
            if (item.meta.title) {
              titleNode = <span>{item.meta.title}</span>
            } else {
              titleNode = <span>{item.name}</span>
            }
            return (
              <a-sub-menu key={keyCode + index} title={<div>{iconNode}{titleNode}</div>}>
                {
                  createMenu(item.children, index + '')
                }
              </a-sub-menu>
            )
          } else {
            return (
            <a-menu-item key={keyCode + index}>
              <router-link to={item.path}>{item.name}</router-link>
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