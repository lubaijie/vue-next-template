<template>
<div class="login-panel-container">
  <a-form :model="form" :rules="rules">
    <a-tabs :activeKey="customActiveKey.value" @change="handleTabClick" :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }">
      <a-tab-pane key="1" tab="账号密码登录">
        <a-form-item name="user">
          <a-input v-model:value="form.user" placeholder="用户名" size="large">
            <template v-slot:prefix>
              <user-outlined style="color: #ccc;font-size: 16px;" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password v-model="form.password" placeholder="密码" size="large">
            <template v-slot:prefix>
              <lock-outlined style="color: #ccc;font-size: 16px;" />
            </template>
          </a-input-password>
        </a-form-item>
      </a-tab-pane>
      <a-tab-pane key="2" tab="手机验证码登录">
        2
        <a-form-item>
          <a-input v-model:value="form.user" />
        </a-form-item>
      </a-tab-pane>
    </a-tabs>
  </a-form>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref
} from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'LoginPanel',

  components: {
    UserOutlined,
    LockOutlined
  },

  setup() {
    const form = reactive({
      user: '',
      password: '',
      phone: ''
    });
    // 表单验证
    const rules = reactive({
      user: [{ required: true, message: '用户名不可为空', trigger: 'blur' }]
    });

    const test = () => {
      console.log(form.user);
    }

    /**tabs标签页 */
    const customActiveKey = ref(1); // 标签Id
    const handleTabClick = key => { // 切换标签页
      customActiveKey.value = key
    }

    return {
      test,
      form,
      rules,
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
