<script>
export default {
  name: 'Button'
};
</script>

<template lang="pug">
button
  slot
</template>

<style lang="scss" scoped>
button {
  padding: 0;
  border: 0;
  background-color: transparent;
}
</style>
