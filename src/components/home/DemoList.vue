<script>
import DemoListItem from '@/components/home/DemoListItem';

export default {
  name: 'DemoList',
  components: {
    DemoListItem
  },
  props: {
    demos: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    styles() {
      const { resolution, isMobile } = this.$store.state;
      return {
        minHeight: isMobile ? 'auto' : `${resolution.y}px`
      };
    }
  }
};
</script>

<template lang="pug">
.demo-list(
  :style = 'styles'
  )
  DemoListItem(
    v-for = 'demo in demos'
    :key = 'demo.key'
    :demo = 'demo'
  )
</template>

<style lang="scss" scoped>
.demo-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  @include l-more-than-mobile {
    margin-left: 50%;
    padding-right: 8%;
    padding-left: 4%;
  }
  @include l-mobile {
    margin-right: 24px;
    margin-left: 24px;
  }
}
</style>
