<script>
export default {
  name: 'GradualCover'
};
</script>

<template lang="pug">
.gradual-cover
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
}
</style>
