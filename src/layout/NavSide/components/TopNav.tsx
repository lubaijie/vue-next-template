import { defineComponent } from 'vue';
import { SettingOutlined } from '@ant-design/icons-vue'
import '../style/index.scss'

const TopNav = defineComponent({
  name: 'TopNav',

  components: {
    SettingOutlined
  },
  
  setup() {

    const handleMenuClick = e => {
      const { key } = e;
      switch (key) {
        case '0':
          // 用户设置
          break;
        case '1':
          // 系统设置
          break;
        case '2':
          // 退出登录
          break;
        default:
          break;
      }
    }

    return () => (
      <div class="top-nav-container">
        <a-dropdown class="top-nav-setting" trigger={['click']} overlay={
          <a-menu onClick={handleMenuClick}>
            <a-menu-item key="0">用户设置</a-menu-item>
            <a-menu-item key="1">系统设置</a-menu-item>
            <a-menu-divider />
            <a-menu-item key="2">退出登录</a-menu-item>
          </a-menu>
        }>
          <setting-outlined />
        </a-dropdown>
      </div>
    )
  }
});

export default TopNav;


