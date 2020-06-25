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
    border-radius: 50%;
    background-color: rgba(#000, 0.8);
  }
}
</style>
