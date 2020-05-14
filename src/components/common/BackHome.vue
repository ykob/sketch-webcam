<script>
import Button from '@/components/common/Button';
import IconArrowBack from '@/components/icon/IconArrowBack';

export default {
  name: 'BackHome',
  components: {
    Button,
    IconArrowBack
  },
  methods: {
    click() {
      this.$router.push('/');
    }
  },
  computed: {
    iconSize() {
      return this.$store.state.isMobile === true ? 20 : 28;
    }
  }
};
</script>

<template lang="pug">
transition(
  appear
)
  Button.back-home(
    @click = 'click'
    v-if = '$route.name !== "Home" && $route.name !== null'
  )
    IconArrowBack(
      :size = 'iconSize'
    )
</template>

<style lang="scss" scoped>
.back-home {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 100;
  @include l-more-than-mobile {
    width: 48px;
    height: 48px;
    top: 12px;
    left: 24px;
  }
  @include l-mobile {
    width: 40px;
    height: 40px;
    top: 8px;
    left: 8px;
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
}
</style>
