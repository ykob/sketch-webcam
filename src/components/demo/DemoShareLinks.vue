<script>
import IconTwitter from '@/components/icon/IconTwitter';

export default {
  name: 'DemoShareLinks',
  components: {
    IconTwitter
  },
  props: {
    isShown: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    text() {
      return `${this.$route.name} / ${process.env.VUE_APP_WEBSITE_NAME}`;
    },
    url() {
      return `${process.env.VUE_APP_DOMAIN}${this.$route.path}`;
    },
    hrefTwitter() {
      return `https://twitter.com/intent/tweet?text=${this.text}&url=${this.url}&hashtags=webgl,threejs,tensorflowjs`;
    }
  }
};
</script>

<template lang="pug">
.demo-share-links
  transition
    a.demo-share-links__btn(
     v-if = 'isShown'
     :href = 'hrefTwitter'
      target = '_blank'
      )
      IconTwitter.demo-share-links__icon-twitter(
        :size = '24'
        )
</template>

<style lang="scss" scoped>
.demo-share-links {
  position: absolute;
  @include l-more-than-mobile {
    right: 28px;
    bottom: 72px;
  }
  @include l-mobile {
    right: 12px;
    bottom: 52px;
  }
  &__btn {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: 4px;
    border-radius: 50%;
    background-color: rgba(#000, 0.8);
    &.v-enter {
      opacity: 0;
      transform: translate3d(0, 4px, 0) scale(0.8);
    }
    &.v-enter-to {
      opacity: 1;
      transform: scale(1);
      transition-duration: 0.2s;
      transition-property: opacity, transform;
    }
    .page-leave-to &,
    &.v-leave-to {
      opacity: 0;
      pointer-events: none;
      transform: translate3d(0, 6px, 0) scale(0.7);
      transition-duration: 0.2s;
      transition-property: opacity, transform;
    }
    @for $i from 1 through 2 {
      &:nth-of-type(#{$i}) {
        &.v-enter-to {
          transition-delay: (2 - $i) * 0.04s;
        }
        .page-leave-to &,
        &.v-leave-to {
          transition-delay: ($i - 1) * 0.04s;
        }
      }
    }
  }
}
</style>
