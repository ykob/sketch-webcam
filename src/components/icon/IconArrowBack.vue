<script>
import Icon from './Icon';

export default {
  name: 'IconArrowBack',
  components: {
    Icon
  },
  props: {
    size: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: '#fff'
    }
  }
};
</script>

<template>
  <Icon :size="size" :color="color">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Icon>
</template>

<style lang="scss" scoped></style>
