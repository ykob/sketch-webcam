<script>
export default {
  name: 'HomeHeader',
  computed: {
    styles() {
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
transition(
  appear
  )
  .home-header(
    :style = 'styles'
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
.home-header {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  &.v-enter {
    opacity: 0;
  }
  &.v-enter-to {
    opacity: 1;
    transition-duration: 1s;
  }
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
