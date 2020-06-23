<script>
export default {
  name: 'Button'
};
</script>

<template lang="pug">
button(
  @click = '$emit("click", $event)'
  )
  slot
</template>

<style lang="scss" scoped>
button {
  appearance: none;
  padding: 0;
  border: 0;
  background-color: transparent;
  &:focus {
    outline: 0;
    box-shadow: 0 0 0 1px rgba(#fff, 0.6);
  }
}
</style>
