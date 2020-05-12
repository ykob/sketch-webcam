<script>
export default {
  name: 'SiteTitle'
};
</script>

<template lang="pug">
transition(
  appear
)
  .site-title(
      v-if = '$route.name !== "Home"'
    )
    |sketch-webcam
</template>

<style lang="scss" scoped>
.site-title {
  width: 11em;
  right: 0;
  left: 0;
  margin: auto;
  text-align: center;
  pointer-events: none;
  position: absolute;
  z-index: 100;
  @include fontSizeAll(18, 18, 14);
  @include l-more-than-mobile {
    top: 24px;
  }
  @include l-mobile {
    top: 20px;
  }

  &.v-enter {
    opacity: 0;
  }
  &.v-enter-to {
    opacity: 1;
    transition-duration: 0.4s;
    transition-property: opacity;
  }
  &.v-leave-to {
    opacity: 0;
    transition-duration: 0.4s;
    transition-property: opacity;
  }
}
</style>
