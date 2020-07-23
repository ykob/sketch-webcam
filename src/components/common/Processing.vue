<script>
export default {
  name: 'Processing',
  computed: {
    isShown() {
      return this.$store.state.processing.isShown;
    },
    splitValue() {
      return String('processing...').split('');
    }
  }
};
</script>

<template lang="pug">
transition(
  appear
  )
  .processing(
    v-if = 'isShown === true'
    )
    .processing__str(
      v-for = 'str in splitValue'
      )
      |{{ str }}
</template>

<style lang="scss" scoped>
@keyframes processingStr {
  0% {
    opacity: 0;
    transform: translate3d(0, 4px, 0);
  }
  33% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  67% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  100% {
    opacity: 0;
    transform: translate3d(0, -8px, 0);
  }
}

.processing {
  display: flex;
  align-items: center;
  justify-content: center;
  &__str {
    animation-name: processingStr;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    animation-timing-function: $easeInOutQuad;
    @for $i from 1 to 14 {
      &:nth-of-type(#{$i}) {
        animation-delay: $i * 0.03s;
      }
    }
  }
}
</style>
