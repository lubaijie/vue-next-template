<template>
<div class="login-panel-container">
  <a-form ref="loginForm" :model="form" :rules="rules">
    <a-tabs :activeKey="customActiveKey.value" @change="handleTabClick" :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }">
      <a-tab-pane key="1" tab="账号密码登录">
        <a-form-item name="user">
          <a-input v-model:value="form.user" placeholder="用户名" size="large">
            <template v-slot:prefix>
              <user-outlined style="color: #ccc;font-size: 16px;" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input-password v-model:value="form.password" placeholder="密码" size="large">
            <template v-slot:prefix>
              <lock-outlined style="color: #ccc;font-size: 16px;" />
            </template>
          </a-input-password>
        </a-form-item>
      </a-tab-pane>
      <a-tab-pane key="2" tab="手机验证码登录">
        <a-form-item name="phone">
          <a-input v-model:value="form.phone" placeholder="手机号码" size="large">
            <template v-slot:prefix>
              <mobile-outlined style="color: #ccc;font-size: 16px;" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="code">
          <a-row :gutter="4">
            <a-col :span="16">
              <a-input v-model:value="form.code" placeholder="验证码" size="large" style="width: 70%;">
                <template v-slot:prefix>
                  <mail-outlined style="color: #ccc;font-size: 16px;" />
                </template>
              </a-input>
            </a-col>
            <a-col :span="8">
              <a-button size="large" @click="getCode" :disabled="codeStr !== '获取验证码'" style="width: 100%">{{ codeStr }}</a-button>
            </a-col>
          </a-row>
        </a-form-item>
      </a-tab-pane>
    </a-tabs>
    <a-form-item>
      <a-checkbox v-model:checked="isAutoLogin" style="float: left;">自动登录</a-checkbox>
      <a-button type="link" style="float:right;height:40px">忘记密码</a-button>
    </a-form-item>
    <a-form-item>
      <a-button class="submit-btn" type="primary" size="large" @click="submit">确 定</a-button>
    </a-form-item>
  </a-form>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref
} from 'vue'
import { UserOutlined, LockOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'LoginPanel',

  components: {
    UserOutlined,
    LockOutlined,
    MobileOutlined,
    MailOutlined
  },

  setup() {
    const form = reactive({
      user: '',
      password: '',
      phone: '',
      code: ''
    });

    const loginForm = ref(null);

    // 表单验证
    const rules = reactive({
      user: [{ required: true, message: '用户名不可为空', trigger: 'blur', whitespace: true }],
      password: [
        { required: true, message: '密码不可为空', trigger: 'blur', whitespace: true },
        { min: 6, message: '密码不能少于6个字符', trigger: 'blur' },
        { pattern: /^[^\u4e00-\u9fa5]+$/, message: '密码不能包含中文字符', trigger: 'blur' },
      ],
      phone: [
        { required: true, message: '手机号码不可为空', trigger: 'blur', whitespace: true },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
      ],
      code: [
        { required: true, message: '请输入验证码', trigger: 'blur', whitespace: true }
      ]
    });

    // 自动登录
    const isAutoLogin = ref(false);

    const test = () => {
      console.log(form.user);
    }

    /**tabs标签页 */
    const customActiveKey = ref('1'); // 标签Id
    const handleTabClick = key => { // 切换标签页
      customActiveKey.value = key
    }

    /**验证码 */
    const codeStr: any = ref('获取验证码');
    const getCode = () => {
      const { validateFields }: any = loginForm.value
      validateFields(['phone']).then(() => {
        const interval = window.setInterval(() => {
          if (codeStr.value === '获取验证码') {
            codeStr.value = 60;
          } else {
            if (codeStr.value-- <= 0) {
              codeStr.value = '获取验证码';
              window.clearInterval(interval);
            }
          }
        }, 1000)
      },err => {
        console.log(err);
      });
    }

    // 提交
    const submit = () => {
      const { validateFields }: any = loginForm.value;
      const filedNames = customActiveKey.value === '1' ? ['user', 'password'] : ['phone','code'];
      validateFields(filedNames).then(value => {
        console.log(value);
      }).catch(error => {
        console.log(error);
      })
    }

    return {
      test,
      form,
      loginForm,
      rules,
      // 标签页
      customActiveKey,
      handleTabClick,
      isAutoLogin, // 自动登录
      /**验证码 */
      codeStr,
      getCode,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>
.login-panel-container {
  width: 350px;
  margin: 0 auto;
}
.submit-btn{
  width: 100%;
}
</style>
<style lang="scss">
.ant-form-explain{
  margin-left: 2px;
  text-align: initial;
}
</style>
