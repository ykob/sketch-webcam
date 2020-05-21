<script>
export default {
  name: 'Modal'
};
</script>

<template lang="pug">
.modal
  .modal__wrap
    .modal__content
  .modal__bg
</template>

<style lang="scss" scoped>
.modal {
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transform: translate3d(0, 0, 0);
  &__wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 10;
  }
  &__content {
    border-radius: 8px;
    background-color: #fff;
  }
  &__bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    background-color: rgba(#000, 0.3);
  }
}
</style>
