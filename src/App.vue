<script>
export default {
  name: 'App',
  async created() {
    const { state, dispatch } = this.$store;

    dispatch('initWebCam');

    // append canvas and add styles to it.
    document.body.append(state.canvas);
    state.canvas.style = `
        position: absolute;
        top: 0;
        left: 0;
      `;

    // On global events.
    window.addEventListener('resize', this.resize);
    window.addEventListener('mousemove', this.mousemove);

    // Initialize
    this.resize();
  },
  methods: {
    resize() {
      const { state, commit } = this.$store;

      state.resolution.set(document.body.clientWidth, window.innerHeight);
      state.canvas.width = state.resolution.x;
      state.canvas.height = state.resolution.y;
      commit('changeMediaQuery', state.resolution.x < 768);
    },
    mousemove(e) {
      const { state } = this.$store;

      if (state.isEnabledTouch === true) return;
      state.mouse.set(
        (e.clientX / state.resolution.x) * 2 - 1,
        -(e.clientY / state.resolution.y) * 2 + 1
      );
    }
  }
};
</script>

<template lang="pug">
  #app
    router-view
</template>

<style lang="scss"></style>
