<script>
export default {
  name: 'Alert',
  computed: {
    text() {
      return this.$store.state.alert.text;
    },
    isShown() {
      return this.$store.state.alert.isShown;
    }
  }
};
</script>

<template lang="pug">
transition(
  appear
)
  .alert(
    v-if = 'isShown === true'
  )
    |{{ text }}
</template>

<style lang="scss" scoped>
.alert {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
