<script>
export default {
  name: 'Processing',
  computed: {
    isShown() {
      return this.$store.state.processing.isShown;
    }
  }
};
</script>

<template lang="pug">
transition(
  appear
  )
  .processing(
    v-if = 'isShown === true'
    )
    |Processing...
</template>

<style lang="scss" scoped>
.processing {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
