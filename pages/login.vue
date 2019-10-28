<template>
  <div class="login">
    <message v-if="errors.hasOwnProperty('auth')" class="mb-1" type="error">
      {{ errors.auth }}
    </message>
    <login-form @submit="login" />
  </div>
</template>

<script>
import Message from '@/components/Message'
import LoginForm from '@/components/LoginForm'

export default {
  layout: 'middle',

  components: { Message, LoginForm },

  data() {
    return {
      errors: []
    }
  },

  methods: {
    async login(form) {
      this.errors = []
      try {
        await this.$auth.loginWith('local', { data: form })
      } catch (e) {
        this.errors = e.response.data

        if (e.response.data.status === 'NG') {
          this.errors.auth =
            'メールアドレスまたは、パスワードが正しくありません。'
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 1em 1.5em;
}
</style>
