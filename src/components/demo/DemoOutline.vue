<script>
import ButtonPlayVideo from '@/components/common/ButtonPlayVideo';

export default {
  name: 'DemoOutline',
  components: {
    ButtonPlayVideo
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    isLoaded: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<template lang="pug">
transition(
  name = 'outline'
  appear
  )
  .demo-outline
    .demo-outline__in
      h1.demo-outline__title
        |{{ title }}
      p.demo-outline__description
        |{{ description }}
      ButtonPlayVideo.demo-outline__play-btn(
        v-if = 'isLoaded === true'
        @click = '$emit("click", $event)'
        )
      .demo-outline__processing-marker(
        v-else
        )
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
  justify-content: center;
  align-items: center;
  @include l-mobile {
    padding: 8px;
  }
  &__in {
    position: relative;
    text-align: center;
    @include l-more-than-mobile {
      padding-bottom: 64px;
    }
    @include l-mobile {
      padding-bottom: 56px;
    }
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
  }
  &__play-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    margin-right: auto;
    margin-left: auto;
  }
  @keyframes rotateLoop {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(720deg);
    }
  }
  &__processing-marker {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    margin-right: auto;
    margin-left: auto;
    @include l-more-than-mobile {
      width: 32px;
      height: 32px;
    }
    @include l-mobile {
      width: 24px;
      height: 24px;
    }
    &:before {
      width: 100%;
      height: 100%;
      content: '';
      display: block;
      border: 2px solid $color-key;
      animation-name: rotateLoop;
      animation-duration: 3s;
      animation-timing-function: $easeInOutSine;
      animation-iteration-count: infinite;
      animation-play-state: running;
    }
  }
  &.outline-enter {
    opacity: 0.9999;
  }
  .outline-enter & {
    &__title,
    &__description,
    &__play-btn {
      opacity: 0;
      transform: translate3d(0, 16px, 0);
    }
    &__processing-marker {
      opacity: 0;
      transform: scale(0.5);
    }
  }
  &.outline-enter-to {
    opacity: 1;
    transition-duration: 2s;
    transition-property: opacity;
  }
  .outline-enter-to & {
    &__title,
    &__description,
    &__play-btn {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition-duration: 1s;
      transition-timing-function: $easeOutCubic;
      transition-property: opacity, transform;
    }
    &__description {
      transition-delay: 0.1s;
    }
    &__play-btn {
      transition-delay: 0.2s;
    }
    &__processing-marker {
      opacity: 1;
      transform: scale(1);
      transition-delay: 0.2s;
    }
  }
  &.outline-leave-to {
    opacity: 0.9999;
    transition-duration: 2s;
    transition-property: opacity;
  }
  .page-leave-to &,
  .outline-leave-to & {
    &__title,
    &__description,
    &__play-btn {
      opacity: 0;
      transform: translate3d(0, -16px, 0);
      transition-duration: 1s;
      transition-timing-function: $easeOutCubic;
      transition-property: opacity, transform;
    }
    &__description {
      transition-delay: 0.06s;
    }
    &__play-btn {
      transition-delay: 0.12s;
    }
    &__processing-marker {
      opacity: 0;
      transform: scale(1.25);
      transition-duration: 1s;
      transition-delay: 0.12s;
      transition-timing-function: $easeOutCubic;
      transition-property: opacity, transform;
    }
  }
}
</style>
