<script>
import * as facemesh from '@tensorflow-models/facemesh';
import store from '@/store';

export default {
  name: 'Facemesh',
  data: () => ({
    model: null,
    timeSegment: 0
  }),
  async created() {
    const { commit, dispatch } = store;

    dispatch('webcam/init').then(async () => {
      this.model = await facemesh.load();

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();
    });
  },
  destroyed() {
    const { commit } = store;
    commit('destroyUpdate');
    commit('destroyResize');
  },
  methods: {
    async update(time) {
      const { state } = store;

      this.timeSegment += time;
      if (this.timeSegment >= 1 / 30) {
        const predictions = await this.model.estimateFaces(state.webcam.video);
        console.log(predictions);
        this.timeSegment = 0;
      }
    },
    resize() {}
  }
};
</script>

<template lang="pug">
h1 BodyPix
</template>

<style lang="scss" scoped></style>
