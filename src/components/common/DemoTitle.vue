<script>
export default {
  name: 'DemoTitle',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
};
</script>

<template lang="pug">
h1.demo-title
  |{{ text }}
</template>

<style lang="scss" scoped>
.demo-title {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}
</style>
