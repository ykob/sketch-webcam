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
}
</style>
