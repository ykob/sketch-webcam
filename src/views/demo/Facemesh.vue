<script>
import * as facemesh from '@tensorflow-models/facemesh';
import store from '@/store';

import DemoConsole from '@/components/common/DemoConsole';
import Video from '@/components/demo/facemesh/Video';
import Face from '@/components/demo/facemesh/Face';

const video = new Video();
const face = new Face();

export default {
  name: 'Facemesh',
  components: {
    DemoConsole
  },
  data: () => ({
    model: null,
    maxFaces: 5,
    timeSegment: 0
  }),
  async created() {
    const { state, commit, dispatch } = store;

    state.scene.add(video);
    state.scene.add(face);

    dispatch('webcam/init').then(async () => {
      this.model = await facemesh.load({
        maxFaces: this.maxFaces
      });
      face.setUv(facemesh.FaceMesh.getUVCoords());

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();
    });
  },
  destroyed() {
    const { state, commit } = store;
    state.scene.remove(video);
    state.scene.remove(face);
    commit('destroyUpdate');
    commit('destroyResize');
  },
  methods: {
    async update(time) {
      const { state } = store;

      this.timeSegment += time;
      if (this.timeSegment >= 1 / 60) {
        const predictions = await this.model.estimateFaces(state.webcam.video);
        if (predictions.length > 0) {
          face.update(predictions[0]);
        }
        this.timeSegment = 0;
      }
    },
    resize() {
      video.resize();
      face.resize();
    }
  }
};
</script>

<template lang="pug">
DemoConsole(
  title = 'Facemesh'
  )
</template>

<style lang="scss" scoped></style>
