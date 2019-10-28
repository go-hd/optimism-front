<template>
  <form action="" @submit.prevent="$emit('submit', { email, password })">
    <div class="row mb-1">
      <label for="email">Email:</label>
      <input id="email" v-model="email" type="email" required />
      <message
        v-if="errors.email"
        class="mt-1"
        type="error"
        :messages="errors.email"
      />
    </div>
    <div class="row mb-2">
      <label for="password">Password:</label>
      <input id="password" v-model="password" type="password" required />
      <message
        v-if="errors.password"
        class="mt-1"
        type="error"
        :messages="errors.password"
      />
    </div>
    <div class="row">
      <button>Login</button>
    </div>
  </form>
</template>

<script>
import Message from '~/components/Message'

export default {
  name: 'LoginForm',
  components: { Message },

  props: {
    errors: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      email: '',
      password: ''
    }
  }
}
</script>
