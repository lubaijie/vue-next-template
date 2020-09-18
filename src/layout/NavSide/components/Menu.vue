<template>
  <div class="menu-container">
    <a-menu
      style="text-align: left;"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="props.collapsed"
    >
      <a-menu-item key="1">
        <svg-icon icon-class="test" />
        <span>Option 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <DesktopOutlined />
        <span>Option 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <InboxOutlined />
        <span>Option 3</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template>
          <span><MailOutlined /><span>Navigation One</span></span>
        </template>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template v-slot:title>
          <span><AppstoreOutlined /><span>Navigation Two</span></span>
        </template>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11">
            Option 11
          </a-menu-item>
          <a-menu-item key="12">
            Option 12
          </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import router from '@/router/index'
import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';


export default defineComponent({
  name: 'LeftMenu',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  components: {
    // PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
  },
  setup(props) {
    const selectedKeys = ref(['1']);
    const openKeys = ref(['sub1']);
    const preOpenKeys = ['sub1'];
    watch(openKeys, (val, oldVal) => {
      preOpenKeys.value = oldVal;
    });
    watch(props, val => {
      openKeys.value = val.collapsed ? [] : preOpenKeys;
    })

    const { options } = router;
    const routerDatas = options.routes;

    return {
      props,
      selectedKeys,
      openKeys,

      routerDatas
    };
  }
});
</script>

<style lang="scss" scoped>
.menu-container{
  height: calc(100% - 200px);
  overflow: auto;
  scrollbar-color: transparent transparent;
  scrollbar-track-color: transparent;
  -ms-scrollbar-track-color: transparent;
  &::-webkit-scrollbar { width: 0 !important }
}
</style>
