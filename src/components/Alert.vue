<script>
export default {
  name: 'Alert',
  computed: {
    text() {
      return this.$store.state.alert.text;
    }
  }
};
</script>

<template lang="pug">
.alert
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
}
</style>
