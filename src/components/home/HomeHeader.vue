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
    position: fixed;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-right: 4 / 100 * 100%;
    padding-left: 8 / 100 * 100%;
  }
  @include l-mobile {
    margin-top: 40px;
    margin-bottom: 40px;
    margin-right: 24px;
    margin-left: 24px;
  }
  &.v-enter {
    opacity: 0;
  }
  &.v-enter-to {
    opacity: 1;
    transition-duration: 1s;
  }
  &__title {
    line-height: 1;
    margin-top: 0;
    @include fontSizeAll(42, 42, 28);
    letter-spacing: 0.12em;
    @include l-more-than-mobile {
      margin-bottom: 16px;
    }
    @include l-mobile {
      margin-bottom: 8px;
    }
  }
  &__description {
    margin-top: 0;
    @include l-more-than-mobile {
      margin-bottom: 24px;
    }
    @include l-mobile {
      margin-bottom: 16px;
    }
  }
  &__options {
    @include l-more-than-mobile {
      display: flex;
      align-items: center;
    }
  }
  &__signature {
    margin: 0;
    @include fontSizeAll(11, 11, 9);
    @include l-more-than-mobile {
      margin-right: 32px;
    }
    @include l-mobile {
      margin-bottom: 8px;
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
}
</style>
