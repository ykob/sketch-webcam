<script>
import Processing from '@/components/common/Processing';

export default {
  name: 'DemoOutline',
  components: {
    Processing
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
};
</script>

<template lang="pug">
transition(
  appear
  )
  .demo-outline
    h1.demo-outline__title
      |{{ title }}
    p.demo-outline__description
      |{{ description }}
    Processing
</template>

<style lang="scss" scoped>
.demo-outline {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @include l-mobile {
    padding: 8px;
  }
  &__title {
    line-height: 1;
    margin-top: 0;
    @include fontSizeAll(40, 40, 28);
    @include l-more-than-mobile {
      margin-bottom: 16px;
    }
    @include l-mobile {
      margin-bottom: 8px;
    }
  }
  &__description {
    max-width: 480px;
    margin: 0;
    text-align: center;
    @include l-more-than-mobile {
      margin-bottom: 40px;
    }
    @include l-mobile {
      margin-bottom: 24px;
    }
  }
  &.v-enter {
    opacity: 0.9999;
  }
  &.v-enter & {
    &__title {
      opacity: 0;
      transform: translate3d(0, 10px, 0);
    }
    &__description {
      opacity: 0;
      transform: translate3d(0, 10px, 0);
    }
  }
  &.v-enter-to {
    opacity: 1;
    transition-duration: 2s;
    transition-property: opacity;
  }
  &.v-enter-to & {
    &__title {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition-duration: 1s;
      transition-property: opacity, transform;
    }
    &__description {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition-duration: 1s;
      transition-delay: 0.1s;
      transition-property: opacity, transform;
    }
  }
  &.v-leave-to {
    opacity: 0.9999;
    transition-duration: 2s;
    transition-property: opacity;
  }
  &.v-leave-to & {
    &__title {
      opacity: 0;
      transform: translate3d(0, -10px, 0);
      transition-duration: 1s;
      transition-property: opacity, transform;
    }
    &__description {
      opacity: 0;
      transform: translate3d(0, -10px, 0);
      transition-duration: 1s;
      transition-delay: 0.1s;
      transition-property: opacity, transform;
    }
  }
}
</style>
