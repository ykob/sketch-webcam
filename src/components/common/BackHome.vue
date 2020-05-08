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
  }
};
</script>

<template lang="pug">
Button.back-home(
  @click = 'click'
)
  IconArrowBack
</template>

<style lang="scss" scoped>
.back-home {
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10;
  @include l-more-than-mobile {
    top: 8px;
    left: 8px;
  }
  @include l-mobile {
  }
}
</style>
