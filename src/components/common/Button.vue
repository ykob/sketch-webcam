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
}
</style>
