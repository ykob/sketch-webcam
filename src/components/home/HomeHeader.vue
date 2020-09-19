<script>
import IconGitHub from '@/components/icon/IconGitHub';
import IconTwitter from '@/components/icon/IconTwitter';

export default {
  name: 'HomeHeader',
  components: {
    IconGitHub,
    IconTwitter
  }
};
</script>

<template lang="pug">
transition(
  appear
  )
  .home-header
    .home-header__in
      h1.home-header__title
        |sketch-webcam
      p.home-header__description
        |Interactive demos with webcam,
        br
        |tensorflow.js models, three.js and Vue-CLI.
      .home-header__options
        p.home-header__signature
          |created by 
          a(
            href = 'https://www.tplh.net/'
            target = '_blank'
            )
            |yoichi kobayashi.
        .home-header__links
          a.home-header__link(
            href = 'https://github.com/ykob/sketch-webcam'
            target = '_blank'
            )
            IconGitHub
          a.home-header__link(
            href = 'https://twitter.com/ykob0123'
            target = '_blank'
            )
            IconTwitter
</template>

<style lang="scss" scoped>
.home-header {
  box-sizing: border-box;
  @include l-more-than-mobile {
    width: 58.6%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
  }
  @include l-mobile-l {
    width: 58.6%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    padding-right: 4vw;
  }

  &__title {
    margin-top: 0;
    letter-spacing: 0.12em;
    @include l-more-than-mobile {
      line-height: 1;
      margin-bottom: 1.2vw;
      font-size: 4vw;
    }
    @include l-mobile-p {
      line-height: 0.8;
      margin-bottom: 3vw;
      font-size: 15vw;
    }
    @include l-mobile-l {
      line-height: 1;
      margin-bottom: 1.2vw;
      font-size: 4.5vw;
    }
  }
  &__description {
    margin-top: 0;
    @include l-more-than-mobile {
      margin-bottom: 2.4vw;
      font-size: 1.2vw;
    }
    @include l-mobile-p {
      margin-bottom: 4.5vw;
      font-size: 3.5vw;
    }
    @include l-mobile-l {
      margin-bottom: 2.4vw;
      font-size: 1.7vw;
    }
  }
  &__options {
    @include l-more-than-mobile {
      display: flex;
      align-items: center;
    }
    @include l-mobile-p {
      margin-bottom: 12vw;
      font-size: 1.4vw;
    }
  }
  &__signature {
    margin: 0;
    @include l-more-than-mobile {
      margin-right: 2vw;
      font-size: 0.85vw;
    }
    @include l-mobile-p {
      margin-bottom: 2vw;
      font-size: 2.5vw;
    }
    @include l-mobile-l {
      margin-bottom: 2vw;
      font-size: 1vw;
    }
  }
  &__links {
    display: flex;
  }
  &__link {
    width: 24px;
    height: 24px;
    display: block;
    margin-right: 12px;
  }
  a {
    transition-duration: 0.2s;
    transition-property: opacity;
    &:hover {
      opacity: 0.5;
    }
  }

  .page-enter & {
    opacity: 0.999;
    &__title,
    &__description,
    &__options {
      opacity: 0;
      transform: translate3d(0, 24px, 0);
    }
  }
  .page-enter-to & {
    opacity: 1;
    transition-duration: 2s;
    transition-property: opacity;
    &__title,
    &__description,
    &__options {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition-duration: 1s;
      transition-property: opacity, transform;
    }
    &__title {
      transition-delay: 0.2s;
    }
    &__description {
      transition-delay: 0.26s;
    }
    &__options {
      transition-delay: 0.32s;
    }
  }
  .page-leave-to & {
    opacity: 0.999;
    transition-duration: 2s;
    transition-property: opacity;
    &__title,
    &__description,
    &__options {
      opacity: 0;
      transform: translate3d(0, -24px, 0);
      transition-duration: 1s;
      transition-property: opacity, transform;
    }
    &__title {
      transition-delay: 0s;
    }
    &__description {
      transition-delay: 0.06s;
    }
    &__options {
      transition-delay: 0.12s;
    }
  }
}
</style>
