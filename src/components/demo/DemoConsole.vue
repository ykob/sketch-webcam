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
    },
    clickDescription: {
      type: Function,
      default: null
    },
    clickTune: {
      type: Function,
      default: null
    },
    clickShare: {
      type: Function,
      default: null
    }
  },
  computed: {
    iconSize() {
      return this.$store.state.isMobile === true ? 20 : 24;
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
    Button.demo-console__btn.demo-console__btn--description(
      v-if = 'clickDescription'
      )
      IconDescription(
        :size = 'iconSize'
        )
    Button.demo-console__btn.demo-console__btn--tune(
      v-if = 'clickTune'
      )
      IconTune(
        :size = 'iconSize'
        )
    Button.demo-console__btn.demo-console__btn--share(
      v-if = 'clickShare'
      @click = 'clickShare'
      )
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
    height: 48px;
    margin: 16px;
    padding-right: 16px;
    padding-left: 24px;
    border-radius: 8px;
  }
  @include l-mobile {
    height: 40px;
    margin: 8px;
    padding-right: 8px;
    padding-left: 16px;
    border-radius: 4px;
  }
  @include l-mobile-p {
    width: calc(100% - 16px);
    justify-content: space-between;
  }

  &.v-enter {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
  }
  &.v-enter-to {
    opacity: 1;
    transition-duration: 0.4s;
    transform: translate3d(0, 0, 0);
    transition-property: opacity, transform;
  }
  &.v-leave-to {
    opacity: 0;
    transition-duration: 0.4s;
    transform: translate3d(0, 16px, 0);
    transition-property: opacity, transform;
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
  &__btn {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    &--description {
      margin-right: 12px;
    }
    &--tune {
      margin-right: 11px;
    }
  }
}
</style>
