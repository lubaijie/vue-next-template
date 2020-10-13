import { defineComponent, reactive, ref } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import './style/index.scss';
import Config from '@/config.ts';
import { encrypt } from '@/utils/rsaEncrypt';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

const Login = defineComponent({
  name: 'Login',

  components: { UserOutlined, LockOutlined },

  setup() {

    const form = reactive({
      username: 'admin',
      password: '123456',
    });

    const isAutoLogin = ref(false);

    // 表单验证
    const rules = reactive({
      username: [{ required: true, message: '用户名不可为空', trigger: 'blur', whitespace: true }],
      password: [
        { required: true, message: '密码不可为空', trigger: 'blur', whitespace: true },
        { min: 6, message: '密码不能少于6个字符', trigger: 'blur' },
        { pattern: /^[^\u4e00-\u9fa5]+$/, message: '密码不能包含中文字符', trigger: 'blur' },
      ]
    });

    const loginForm = ref(null);
    const store = useStore();
    const router = useRouter();
    const submit = () => {
      const { validateFields }: any = loginForm.value;
      const filedNames = ['username', 'password'];
      validateFields(filedNames).then((value: any) => {
        value.password = encrypt(value.password);

        store.dispatch('user/Login', value).then(() => {
          router.push({path: '/'});
        })
      }).catch((error: any) => {
        console.log(error);
      })
    }

    return () => (
      <div class="login-container">
        <div class="title-container">
          <img class="logo" src="/img/logo.svg" />
          <div class="title">{ Config.title }</div>
        </div>
        <div class="from-container">
          <a-form ref={loginForm} model={form} rules={rules}>
            <a-form-item hasFeedback name="username" >
              <a-input class="from-input" v-model={[form.username, 'value']} placeholder="用户名" size="large" prefix={
                <user-outlined class="form-icon" />
              } />
            </a-form-item>
            <a-form-item hasFeedback name="password" >
              <a-input-password v-model={[form.password, 'value']} placeholder="" size="large" prefix={
                <lock-outlined class="form-icon" />
              } />
            </a-form-item>
            <a-form-item>
              <a-checkbox v-model={[isAutoLogin.value, 'checked']} class="autologin">自动登录</a-checkbox>
              <a-button type="link" style="float:right;height:40px">忘记密码</a-button>
            </a-form-item>
            <a-form-item>
              <a-button class="submit" type="primary" onClick={submit}>确 定</a-button>
            </a-form-item>
          </a-form>
        </div>
        
      </div>
    )
  }
});

export default Login;