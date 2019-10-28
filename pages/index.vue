<template>
  <div></div>
</template>

<script>
export default {
  auth: false,
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>

<style scoped>
div {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
