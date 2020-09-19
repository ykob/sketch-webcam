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
      const { resolution } = this.$store.state;
      const { isMobilePortrait } = this.$store.getters;
      return {
        minHeight: isMobilePortrait ? 'auto' : `${resolution.y}px`
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
    v-for = 'demo, index in demos'
    :key = 'demo.key'
    :index = 'demos.length - index'
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
}
</style>
