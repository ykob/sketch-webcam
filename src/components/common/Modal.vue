<script>
export default {
  name: 'Modal',
  computed: {
    text() {
      return this.$store.state.modal.text;
    },
    isShown() {
      return this.$store.state.modal.isShown;
    }
  }
};
</script>

<template lang="pug">
transition(
  appear
  )
  .modal(
    v-if = 'isShown === true'
    )
    .modal__wrap
      .modal__content
        |{{ text }}
    .modal__bg
</template>

<style lang="scss" scoped>
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transform: translate3d(0, 0, 0);
  &__wrap {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 10;
    @include l-more-than-mobile {
      padding: 24px;
    }
    @include l-mobile {
      padding: 24px;
    }
  }
  &__content {
    text-align: center;
    background-color: #000;
    @include l-more-than-mobile {
      padding: 24px 32px;
      border-radius: 8px;
    }
    @include l-mobile {
      padding: 12px 16px;
      border-radius: 4px;
    }
  }
  &__bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(#000, 0.7);
  }
}
</style>
