<script>
import * as facemesh from '@tensorflow-models/facemesh';
import store from '@/store';

import DemoConsole from '@/components/common/DemoConsole';
import Video from '@/webgl/demo/glasses/Video';

export default {
  name: 'Glasses',
  components: {
    DemoConsole
  },
  data: () => ({
    video: new Video(),
    model: null,
    timeSegment: 0
  }),
  async created() {
    const { state, commit, dispatch } = store;

    state.scene.add(this.video);

    dispatch('webcam/init').then(async () => {
      this.model = await facemesh.load({
        maxFaces: 1,
        iouThreshold: 0.1
      });

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();
    });
  },
  destroyed() {
    const { state, commit } = store;
    state.scene.remove(this.video);
    commit('destroyUpdate');
    commit('destroyResize');
  },
  methods: {
    async update(time) {
      const { state } = store;

      this.timeSegment += time;
      if (this.timeSegment >= 1 / 60) {
        const predictions = await this.model.estimateFaces(state.webcam.video);
        this.timeSegment = 0;
        console.log(predictions);
      }
    },
    resize() {
      this.video.resize();
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
