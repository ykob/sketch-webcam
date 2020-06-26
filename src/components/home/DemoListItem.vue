<script>
import zeroPadding from 'js-util/zeroPadding';

export default {
  name: 'DemoListItem',
  props: {
    demo: {
      type: Object,
      default: () => {
        return {
          path: '',
          name: ''
        };
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    classnames() {
      return [`demo-list-item--${this.index + 1}`];
    },
    number() {
      return `#${zeroPadding(this.index, 3)}`;
    }
  },
  methods: {
    click(e) {
      e.preventDefault();
      const href = e.currentTarget.attributes.href.value;
      this.$router.push(href);
    }
  }
};
</script>

<template lang="pug">
transition(
  appear
  )
  a.demo-list-item(
    :href = 'demo.path'
    :class = 'classnames'
    @click = 'click'
    )
    .demo-list-item__num
      |{{number}}
    .demo-list-item__label
      |{{ demo.name }}
</template>

<style lang="scss" scoped>
.demo-list-item {
  line-height: 1;
  display: flex;
  align-items: flex-end;
  @include l-more-than-mobile {
    margin-top: 36px;
  }
  @include l-mobile {
    margin-top: 24px;
  }
  &:first-child {
    margin-top: 0;
  }
  &__num {
    @include fontSizeAll(16, 16, 12);
    @include l-more-than-mobile {
      margin-right: 24px;
      padding-bottom: 4px;
    }
    @include l-mobile {
      margin-right: 16px;
      padding-bottom: 2px;
    }
  }
  &__label {
    @include fontSizeAll(28, 28, 21);
    letter-spacing: 0.12em;
  }

  &.v-enter {
    opacity: 0;
    transform: translate3d(0, 10px, 0);
  }
  &.v-enter-to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition-duration: 1s;
    transition-property: opacity, transform;
  }
  &.v-leave-to {
    opacity: 0;
    transform: translate3d(0, -10px, 0);
    transition-duration: 1s;
    transition-property: opacity, transform;
  }

  @for $i from 1 through 100 {
    &:nth-of-type(#{$i}) {
      &.v-enter-to,
      &.v-leave-to {
        transition-delay: (($i - 1) * 0.06) * 1s;
      }
    }
  }
}
</style>
