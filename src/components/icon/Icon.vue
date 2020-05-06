<script>
export default {
  name: 'Icon',
  props: {
    size: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    styles() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        fill: this.color
      };
    }
  }
};
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18px"
    height="18px"
    :style="styles"
  >
    <slot />
  </svg>
</template>

<style lang="scss" scoped>
svg {
  display: block;
}
</style>
