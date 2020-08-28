import { defineComponent } from 'vue'
import './login.scss'

export default defineComponent ({
  name: 'Login',

  setup() {
    return () => (
      <div class="login-container">登录</div>
    )
  }
})