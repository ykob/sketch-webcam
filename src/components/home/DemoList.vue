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
  }
};
</script>

<template lang="pug">
.demo-list
  DemoListItem(
    v-for = 'demo in demos'
    :key = 'demo.key'
    :demo = 'demo'
  )
</template>

<style lang="scss" scoped>
.demo-list {
  box-sizing: border-box;
  @include l-more-than-mobile {
    max-width: 1000px;
    padding-right: 100px;
    padding-left: 100px;
    margin-right: auto;
    margin-left: auto;
  }
  @include l-mobile {
    margin-right: 16px;
    margin-left: 16px;
  }
}
</style>
