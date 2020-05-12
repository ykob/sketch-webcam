<script>
import Button from '@/components/common/Button';
import IconDescription from '@/components/icon/IconDescription';
import IconShare from '@/components/icon/IconShare';
import IconTune from '@/components/icon/IconTune';

export default {
  name: 'DemoConsole',
  components: {
    Button,
    IconDescription,
    IconShare,
    IconTune
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconSize() {
      return this.$store.state.isMobile === true ? 16 : 24;
    }
  }
};
</script>

<template lang="pug">
transition(
  appear
)
  .demo-console
    h1.demo-console__title
      |Demo: {{ title }}
    .demo-console__btns
      Button.demo-console__btn.demo-console__btn--description
        IconDescription(
          :size = 'iconSize'
        )
      Button.demo-console__btn.demo-console__btn--tune
        IconTune(
          :size = 'iconSize'
        )
      Button.demo-console__btn.demo-console__btn--share
        IconShare(
          :size = 'iconSize'
        )
</template>

<style lang="scss" scoped>
.demo-console {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 10;
  line-height: 1;
  background-color: rgba(#000, 0.8);
  @include l-more-than-mobile {
    margin: 16px;
    padding: 16px 24px;
    border-radius: 8px;
  }
  @include l-mobile {
    margin: 8px;
    padding: 12px 16px;
    border-radius: 4px;
  }
  @include l-mobile-p {
    width: calc(100% - 16px);
    justify-content: space-between;
  }

  &.v-enter {
    opacity: 0;
  }
  &.v-enter-to {
    opacity: 1;
    transition-duration: 0.4s;
    transition-property: opacity;
  }
  &.v-leave-to {
    opacity: 0;
    transition-duration: 0.4s;
    transition-property: opacity;
  }

  &__title {
    line-height: 1;
    margin-top: 0;
    margin-bottom: 0;
    @include fontSizeAll(16, 16, 13);
    text-transform: uppercase;
    @include l-more-than-mobile {
      margin-right: 40px;
    }
    @include l-mobile-l {
      margin-right: 24px;
    }
  }
  &__btns {
    display: flex;
  }
  &__btn {
    &--description {
      margin-right: 12px;
    }
    &--tune {
      margin-right: 11px;
    }
  }
}
</style>
