<script>
import ScrollWrap from '@/components/common/ScrollWrap';
import DemoList from '@/components/home/DemoList';

export default {
  name: 'Home',
  components: {
    ScrollWrap,
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
    },
    stylesWrap() {
      const { resolution } = this.$store.state;
      return {
        width: `${resolution.x}px`,
        height: `${resolution.y}px`
      };
    }
  }
};
</script>

<template lang="pug">
ScrollWrap
  .wrap(
    :style = 'stylesWrap'
    )
    div
      h1
        |sketch-webcam
      p
        |Interactive demos with webcam,
        br
        |tensorflow.js models, three.js and Vue-CLI.
  DemoList(
    :demos = 'demos'
  )
</template>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
h1 {
  line-height: 1;
  margin: 0 0 1em;
  @include fontSizeAll(28, 28, 21);
  letter-spacing: 0.3em;
}
p {
  margin: 0;
}
</style>
