<script>
export default {
  name: 'App',
  data() {
    return {
      webcam: null
    };
  },
  async created() {
    const { state } = this.$store;

    const WebCam = await import('@/components/common/WebCam.js');
    this.webcam = new WebCam.default();
    await this.webcam.init();

    // append canvas and add styles to it.
    document.body.append(state.canvas);
    state.canvas.style = `
        position: absolute;
        top: 0;
        left: 0;
      `;

    // On global events.
    window.addEventListener('resize', this.resize);

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
    }
  }
};
</script>

<template lang="pug">
  #app
    router-view
</template>

<style lang="scss"></style>
