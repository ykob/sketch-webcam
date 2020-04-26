<script>
import * as facemesh from '@tensorflow-models/facemesh';
import store from '@/store';

import DemoTitle from '@/components/common/DemoTitle';
import Video from '@/components/demo/bodyPix/Video';

const video = new Video();

export default {
  name: 'Facemesh',
  components: {
    DemoTitle
  },
  data: () => ({
    model: null,
    timeSegment: 0
  }),
  async created() {
    const { state, commit, dispatch } = store;

    dispatch('webcam/init').then(async () => {
      this.model = await facemesh.load();
      state.scene.add(video);

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();
    });
  },
  destroyed() {
    const { state, commit } = store;
    state.scene.remove(video);
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
    resize() {
      video.resize();
    }
  }
};
</script>

<template lang="pug">
DemoTitle(
  text = 'Facemesh'
)
</template>

<style lang="scss" scoped></style>
