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
    iconSize() {
      return this.$store.state.isMobile === true ? 28 : 32;
    },
    hrefTwitter() {
      return `https://twitter.com/intent/tweet?text=${this.$route.path}`;
    }
  }
};
</script>

<template lang="pug">
transition(
  appear
  )
  .demo-share-links(
    v-if = 'isShown'
    )
    a.demo-share-links__btn(
      :href = 'hrefTwitter'
      target = '_blank'
      )
      IconTwitter.demo-share-links__icon-twitter(
        :size = 'iconSize'
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
    display: block;
    position: relative;
    border-radius: 50%;
    background-color: rgba(#000, 0.8);
  }
  &__icon-twitter {
    position: absolute;
    @include l-more-than-mobile {
      top: 4px;
      left: 5px;
    }
    @include l-mobile {
      top: 6px;
      left: 7px;
    }
  }
}
</style>
