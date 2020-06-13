<script>
import * as facemesh from '@tensorflow-models/facemesh';
import store from '@/store';

import DemoConsole from '@/components/common/DemoConsole';
import PromiseOBJLoader from '@/webgl/common/PromiseOBJLoader';
import Glasses from '@/webgl/demo/glasses/Glasses';
import Video from '@/webgl/demo/glasses/Video';

export default {
  name: 'Glasses',
  components: {
    DemoConsole
  },
  data: () => ({
    video: new Video(),
    glasses: null,
    model: null,
    timeSegment: 0
  }),
  async created() {
    const { state, commit, dispatch } = store;

    Promise.all([
      dispatch('webcam/init'),
      facemesh.load({
        maxFaces: 1,
        iouThreshold: 0.1
      }),
      PromiseOBJLoader(`${process.env.BASE_URL}obj/Glasses_01.obj`)
    ]).then(async response => {
      if (this._isDestroyed !== false) return;

      this.glasses = new Glasses(response[2].children[0].geometry);
      this.model = response[1];

      state.scene.add(this.glasses);
      state.scene.add(this.video);

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();
    });
  },
  destroyed() {
    const { state, commit } = store;

    state.scene.remove(this.glasses);
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
        this.glasses.update(predictions[0]);
        this.timeSegment = 0;
      }
    },
    resize() {
      this.glasses.resize();
      this.video.resize();
    }
  }
};
</script>

<template lang="pug">
DemoConsole(
  title = 'Glasses'
  )
</template>

<style lang="scss" scoped></style>
