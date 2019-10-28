<template>
  <div class="message" :class="type">
    <template v-if="messages">
      <div v-for="(message, index) in messages" :key="index">
        {{ message }}
      </div>
    </template>
    <slot v-else />
  </div>
</template>

<script>
export default {
  name: 'Message',

  props: {
    type: {
      type: String,
      default: ''
    },

    messages: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  font-size: 0.8em;
  padding: 0.6em;
  color: #333;
  background: #ccc;
  border: 1px solid #666;
  border-radius: 6px;

  &.error {
    color: #aa0000;
    background: #eebbbb;
    border: 1px solid #aa0000;
  }
}
</style>
