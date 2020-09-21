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
  :duration = '2000'
  )
  .demo-outline
    .demo-outline__in
      h1.demo-outline__title
        |{{ title }}
      p.demo-outline__description
        |{{ description }}
      template(
        v-if = 'isLoaded === true'
        )
        transition
          ButtonPlayVideo.demo-outline__play-btn(
            @click = '$emit("click", $event)'
            )
      template(
        v-else
        )
        transition
          .demo-outline__processing-marker
            span
</template>

<style lang="scss" scoped>
.demo-outline {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  @include l-more-than-mobile {
    max-width: 480px;
    margin-right: auto;
    margin-left: auto;
  }
  @include l-mobile-p {
    padding-right: 24px;
    padding-left: 24px;
  }
  @include l-mobile-l {
    padding-right: 16vw;
    padding-left: 16vw;
  }
  &__in {
    position: relative;
    text-align: center;
    @include l-more-than-mobile {
      padding-bottom: 48px;
    }
    @include l-mobile {
      padding-bottom: 40px;
    }
  }
  &__title {
    line-height: 1;
    margin-top: 0;
    @include l-more-than-mobile {
      margin-bottom: 1vw;
      font-size: 4vw;
    }
    @include l-mobile-p {
      margin-bottom: 3vw;
      font-size: 10vw;
    }
    @include l-mobile-l {
      margin-bottom: 1.5vw;
      font-size: 6vw;
    }
  }
  &__description {
    margin: 0;
    @include l-more-than-mobile {
      margin-bottom: 2vw;
      font-size: 1.2vw;
    }
    @include l-mobile-p {
      margin-bottom: 6vw;
      font-size: 3.5vw;
    }
    @include l-mobile-l {
      margin-bottom: 3vw;
      font-size: 2.1vw;
    }
  }
  &__play-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    margin-right: auto;
    margin-left: auto;
    &.v-enter {
      opacity: 0;
      transform: translate3d(0, 16px, 0);
    }
    &.v-enter-to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition-duration: 1s;
      transition-delay: 0.6s;
      transition-timing-function: $easeOutCubic;
      transition-property: opacity, transform;
    }
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
    right: 0;
    left: 0;
    margin-right: auto;
    margin-left: auto;
    @include l-more-than-mobile {
      width: 32px;
      height: 32px;
      bottom: 8px;
    }
    @include l-mobile {
      width: 24px;
      height: 24px;
      bottom: 8px;
    }
    span {
      width: 100%;
      height: 100%;
      content: '';
      display: block;
      border: 2px solid $color-key;
      animation-name: rotateLoop;
      animation-duration: 3s;
      animation-timing-function: $easeInOutSine;
      animation-iteration-count: infinite;
    }
    &.v-leave-to {
      opacity: 0;
      transform: scale(1.5);
      transition-duration: 1s;
      transition-timing-function: $easeOutCubic;
      transition-property: opacity, transform;
    }
  }
  .outline-enter & {
    &__title,
    &__description {
      opacity: 0;
      transform: translate3d(0, 24px, 0);
    }
    &__processing-marker {
      opacity: 0;
      transform: scale(0.5);
    }
  }
  .outline-enter-to & {
    &__title,
    &__description {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition-duration: 1s;
      transition-delay: 0.5s;
      transition-timing-function: $easeOutCubic;
      transition-property: opacity, transform;
    }
    &__description {
      transition-delay: 0.6s;
    }
    &__processing-marker {
      opacity: 1;
      transform: scale(1);
      transition-duration: 1s;
      transition-delay: 0.7s;
      transition-timing-function: $easeOutCubic;
      transition-property: opacity, transform;
    }
  }
  .page-leave-to &,
  .outline-leave-to & {
    &__title,
    &__description,
    &__play-btn {
      opacity: 0;
      transform: translate3d(0, -24px, 0);
      transition-duration: 1s;
      transition-delay: 0s;
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
