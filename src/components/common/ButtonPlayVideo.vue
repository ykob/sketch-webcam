<script>
export default {
  name: 'ButtonPlayVideo'
};
</script>

<template lang="pug">
button(
  @click = '$emit("click", $event)'
  )
  |Play
</template>

<style lang="scss" scoped>
button {
  display: block;
  appearance: none;
  padding: 0;
  border: 0;
  border-radius: 20px;
  color: $color-bg;
  background-color: $color-link;
  @include l-more-than-mobile {
    width: 180px;
    height: 40px;
  }
  @include l-mobile {
    width: 150px;
    height: 32px;
  }
  &:focus {
    outline: 0;
    box-shadow: 0 0 0 1px rgba(#fff, 0.6);
  }
}
</style>
