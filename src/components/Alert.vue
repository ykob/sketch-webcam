<script>
export default {
  name: 'Alert'
};
</script>

<template lang="pug">
.alert
  |navigator.mediaDevices is disabled.
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
