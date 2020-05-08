<script>
export default {
  name: 'SiteTitle'
};
</script>

<template lang="pug">
.site-title
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
  @include fontSizeAll(18, 18, 14);
  @include l-more-than-mobile {
    top: 24px;
  }
  @include l-mobile {
    top: 12px;
  }
}
</style>
