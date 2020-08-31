<template>
<div class="login-panel-container">
  <a-form :mode="form">
    <a-tabs :activeKey="customActiveKey" @change="handleTabClick" :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }">
      <a-tab-pane :key="1" tab="账号密码登录">
        <a-form-item>
          <a-input v-model:value="form.user" placeholder="用户名">
            <template v-slot:prefix>
              123
            </template>
          </a-input>
        </a-form-item>
      </a-tab-pane>
      <a-tab-pane :key="2" tab="手机验证码登录">
        <a-form-item>
          <a-input v-model:value="form.user" />
        </a-form-item>
      </a-tab-pane>
    </a-tabs>

  </a-form>
  <svg-icon iconClass="app" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref
} from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

export default defineComponent({
  name: 'LoginPanel',

  components: {
    SvgIcon
  },

  setup() {
    const form = reactive({
      user: '',
      password: '',
      phone: ''
    });

    /**tabs标签页 */
    const customActiveKey = ref(1); // 标签Id
    const handleTabClick = key => { // 切换标签页
      customActiveKey.value = key
    }

    return {
      form,
      // 标签页
      customActiveKey,
      handleTabClick
    }
  }
})
</script>

<style lang="scss" scoped>
.login-panel-container {
  width: 350px;
  margin: 0 auto;
}
</style>
