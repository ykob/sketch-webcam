<script>
export default {
  name: 'Home',
  computed: {
    demos() {
      return this.$router.options.routes[1].children.map(demo => {
        return {
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
div
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
  ul
    li(
      v-for = 'demo in demos'
    )
      a(
        :href = 'demo.path'
      )
        |{{ demo.name }}
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
