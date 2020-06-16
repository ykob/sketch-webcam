<script>
export default {
  name: 'HomeHeader'
};
</script>

<template lang="pug">
transition(
  appear
  )
  .home-header
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
  box-sizing: border-box;
  @include l-more-than-mobile {
    position: fixed;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-right: 4 / 100 * 100%;
    padding-left: 8 / 100 * 100%;
  }
  @include l-mobile {
    margin-top: 32px;
    margin-bottom: 24px;
    margin-right: 24px;
    margin-left: 24px;
  }
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
  margin: 0 0 0.3em;
  @include fontSizeAll(42, 42, 28);
  letter-spacing: 0.12em;
}
p {
  margin: 0;
}
</style>
