<template>
  <div>
    <!-- <a-button type="primary" @click="toggleCollapsed" style="margin-bottom: 16px">
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </a-button> -->
    <a-menu
      style="text-align: left;"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="props.collapsed"
    >
      <a-menu-item key="1">
        <PieChartOutlined />
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
        <template v-slot:title>
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
      <a-sub-menu key="sub4">
        <template v-slot:title>
          <span><AppstoreOutlined /><span>Navigation Two</span></span>
        </template>
        <a-menu-item key="13">Option 9</a-menu-item>
        <a-menu-item key="14">Option 10</a-menu-item>
        <a-sub-menu key="sub5" title="Submenu">
          <a-menu-item key="15">
            Option 11
          </a-menu-item>
          <a-menu-item key="16">
            Option 12
          </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import {
  // MenuFoldOutlined,
  // MenuUnfoldOutlined,
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
    // MenuFoldOutlined,
    // MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
  },
  setup(props) {
    // const collapsed = ref(false);
    const selectedKeys = ref(['1']);
    const openKeys = ref(['sub1']);
    const preOpenKeys = ref(['sub1']);

    watch(openKeys, (val, oldVal) => {
      preOpenKeys.value = oldVal;
    });

    watch(props, val => {
      openKeys.value = val.collapsed ? [] : preOpenKeys.value;
    })


    // const toggleCollapsed = () => {
    //   collapsed.value = !collapsed.value;
    //   openKeys.value = collapsed.value ? [] : preOpenKeys.value;
    // };

    return {
      props,
      selectedKeys,
      openKeys,
      preOpenKeys,
      // toggleCollapsed
    };
  }
});
</script>
