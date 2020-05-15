<script>
export default {
  name: 'GradualCover'
};
</script>

<template lang="pug">
transition(
  appear
  )
  .gradual-cover(
    v-if = '$route.name !== "Home" && $route.name !== null'
    )
</template>

<style lang="scss" scoped>
.gradual-cover {
  width: 100%;
  height: 96px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  pointer-events: none;
  background-image: linear-gradient(
    180deg,
    rgba(#000, 0.3) 0%,
    rgba(#000, 0) 100%
  );

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
