<script>
import ScrollWrap from '@/components/common/ScrollWrap';
import HomeHeader from '@/components/home/HomeHeader';
import DemoList from '@/components/home/DemoList';

export default {
  name: 'Home',
  components: {
    ScrollWrap,
    HomeHeader,
    DemoList
  },
  computed: {
    demos() {
      return this.$router.options.routes[1].children
        .filter(demo => {
          return demo.path !== '';
        })
        .map(demo => {
          return {
            key: `demo-${demo.name}`,
            name: demo.name,
            path: `/demo/${demo.path}`
          };
        });
    }
  }
};
</script>

<template lang="pug">
transition(
  name = 'page'
  appear
  )
  .page
    HomeHeader(
      v-if = '!$store.getters.isMobilePortrait'
      )  
    ScrollWrap.home-demolist
      HomeHeader(
        v-if = '$store.getters.isMobilePortrait'
        )
      DemoList(
        :demos = 'demos'
        )
</template>

<style lang="scss" scoped>
.page {
  height: 100%;
  box-sizing: border-box;
  position: relative;
  @include l-more-than-mobile {
    margin-right: 8vw;
    margin-left: 8vw;
  }
  @include l-mobile-p {
    padding-top: 40px;
    padding-bottom: 40px;
    padding-right: 24px;
    padding-left: 24px;
  }
  @include l-mobile-l {
    margin-right: 8vw;
    margin-left: 8vw;
  }
}
.home-demolist {
  @include l-more-than-mobile {
    width: 41.4%;
    position: absolute;
    top: 0;
    right: 0;
  }
  @include l-mobile-l {
    width: 41.4%;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
