<script>
import Icon from './Icon';

export default {
  name: 'IconTwitter',
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
  <Icon :size="size" :color="color" :viewBox="32.58">
    <path
      d="M11.89 26.65c9.49 0 14.68-7.86 14.68-14.68 0-.22 0-.45-.02-.67 1.01-.73 1.88-1.63 2.57-2.67-.94.42-1.94.69-2.96.81a5.18 5.18 0 002.27-2.85c-1.01.6-2.12 1.02-3.28 1.25a5.156 5.156 0 00-7.3-.22 5.155 5.155 0 00-1.49 4.93c-4.15-.21-8.01-2.17-10.63-5.39a5.165 5.165 0 001.6 6.89c-.82-.02-1.62-.25-2.34-.65v.07a5.16 5.16 0 004.14 5.06 5.1 5.1 0 01-2.33.09c.68 2.1 2.61 3.54 4.82 3.58a10.339 10.339 0 01-6.41 2.21c-.41 0-.82-.03-1.23-.07 2.36 1.5 5.11 2.31 7.91 2.31"
    />
  </Icon>
</template>

<style lang="scss" scoped></style>
