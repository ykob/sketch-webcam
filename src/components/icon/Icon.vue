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
    },
    viewBox: {
      type: Number,
      default: 24
    }
  },
  computed: {
    viewBoxStr() {
      return `0 0 ${this.viewBox} ${this.viewBox}`;
    },
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

<template lang="pug">
  svg(
    xmlns = 'http://www.w3.org/2000/svg'
    width = '18px'
    height = '18px'
    :viewBox = 'viewBoxStr'
    :style = 'styles'
    )
    slot
</template>

<style lang="scss" scoped>
svg {
  display: block;
}
</style>
