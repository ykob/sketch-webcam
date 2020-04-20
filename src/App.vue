<script>
import Alert from '@/components/Alert.vue';

export default {
  name: 'App',
  components: {
    Alert
  },
  async created() {
    const { state } = this.$store;

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
    state.camera.start();
    this.update();
    state.clock.start();
  },
  methods: {
    update() {
      const { state } = this.$store;

      const time = state.clock.running === true ? state.clock.getDelta() : 0;
      if (state.update !== null) {
        state.update(time);
      }
      state.renderer.render(state.scene, state.camera);
      requestAnimationFrame(this.update);
    },
    resize() {
      const { state, commit } = this.$store;

      commit('changeMediaQuery', state.resolution.x < 768);
      state.resolution.set(document.body.clientWidth, window.innerHeight);
      state.canvas.width = state.resolution.x;
      state.canvas.height = state.resolution.y;
      state.camera.resize();
      state.renderer.setSize(state.resolution.x, state.resolution.y);
      if (state.resize !== null) {
        state.resize();
      }
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
    Alert
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');

@import '@/assets/scss/foundation/normalize.scss';
@import '@/assets/scss/foundation/global.scss';
@import '@/assets/scss/foundation/keyframes.scss';
</style>
