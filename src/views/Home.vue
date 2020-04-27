<script>
export default {
  name: 'Home',
  computed: {
    stylesWrap() {
      const { resolution } = this.$store.state;
      return {
        width: `${resolution.x}px`,
        height: `${resolution.y}px`
      };
    }
  }
};
</script>

<template lang="pug">
.wrap(
  :style = 'stylesWrap'
  )
  div
    h1
      |sketch-webcam
    p
      |Interactive demos with webcam,
      br
      |tensorflow.js models, three.js and Vue-CLI.
</template>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
h1 {
  line-height: 1;
  margin: 0 0 1em;
  @include fontSizeAll(28, 28, 21);
  letter-spacing: 0.3em;
}
p {
  margin: 0;
}
</style>
