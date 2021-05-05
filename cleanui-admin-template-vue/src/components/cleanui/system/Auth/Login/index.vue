<template>
  <div>
    <div class="text-center mb-5">
      <h1 class="mb-5">
        <strong>Welcome to {{ settings.logo }}</strong>
      </h1>
      <p>
        Pluggable enterprise-level application framework.
        <br />An excellent front-end solution for web applications built upon Ant Design.
        <br />Credentials for testing purposes -
        <strong>demo@sellpixels.com</strong> /
        <strong>demo123</strong>
      </p>
    </div>
    <div class="card" :class="$style.container">
      <div class="text-dark font-size-24 mb-3">
        <strong>Sign in to your account</strong>
      </div>
      <div class="mb-4">
        <a-radio-group
          :value="settings.authProvider"
          @change="e => changeAuthProvider(e.target.value)"
        >
          <a-radio value="firebase">Firebase</a-radio>
          <a-radio value="jwt">JWT</a-radio>
          <a-tooltip>
            <template slot="title">
              <span>Read Docs Guide</span>
            </template>
            <a-radio value="auth0" disabled>Auth0</a-radio>
          </a-tooltip>
          <a-tooltip>
            <template slot="title">
              <span>Read Docs Guide</span>
            </template>
            <a-radio value="strapi" disabled>Strapi</a-radio>
          </a-tooltip>
        </a-radio-group>
      </div>
      <a-form class="mb-4" :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            size="large"
            placeholder="Email"
            v-decorator="['email', { initialValue: 'demo@sellpixels.com', rules: [{ required: true, message: 'Please input your username!' }]}]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            placeholder="Password"
            type="password"
            v-decorator="['password', {initialValue: 'demo123', rules: [{ required: true, message: 'Please input your Password!' }]}]"
          />
        </a-form-item>
        <a-button
          type="primary"
          htmlType="submit"
          size="large"
          class="text-center w-100"
          :loading="loading"
        >
          <strong>Sign in</strong>
        </a-button>
      </a-form>
      <router-link to="/auth/forgot-password" class="kit__utils__link font-size-16">Forgot Password?</router-link>
    </div>
    <div class="text-center pt-2 mb-auto">
      <span class="mr-2">Don't have an account?</span>
      <router-link to="/auth/register" class="kit__utils__link font-size-16">Sign up</router-link>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'CuiLogin',
  computed: {
    ...mapState(['settings']),
    loading() {
      return this.$store.state.user.loading
    },
  },
  data: function () {
    return {
      form: this.$form.createForm(this),
    }
  },
  methods: {
    changeAuthProvider(value) {
      this.$store.commit('CHANGE_SETTING', { setting: 'authProvider', value })
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch('user/LOGIN', { payload: values })
        }
      })
    },
  },
}
</script>
<style lang="scss" module>
@import "@/components/cleanui/system/Auth/style.module.scss";
</style>
