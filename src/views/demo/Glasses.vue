<script>
import * as facemesh from '@tensorflow-models/facemesh';
import sleep from 'js-util/sleep';
import store from '@/store';

import DemoConsole from '@/components/demo/DemoConsole';
import DemoOutline from '@/components/demo/DemoOutline';
import PromiseOBJLoader from '@/webgl/common/PromiseOBJLoader';
import Glasses from '@/webgl/demo/glasses/Glasses';
import Video from '@/webgl/demo/glasses/Video';

export default {
  name: 'Glasses',
  metaInfo: {
    title: 'Glasses / '
  },
  components: {
    DemoConsole,
    DemoOutline
  },
  data: () => ({
    isLoaded: false,
    video: new Video(),
    glasses: null,
    model: null,
    timeSegment: 0
  }),
  created() {
    const { state, commit, dispatch } = store;
    const timeStart = Date.now();

    Promise.all([
      dispatch('webcam/init'),
      facemesh.load({
        maxFaces: 1,
        iouThreshold: 0.1
      }),
      PromiseOBJLoader(`${process.env.BASE_URL}obj/Glasses_01.obj`)
    ]).then(async response => {
      const time = Math.max(100, 2000 - Date.now() + timeStart);
      await sleep(time);

      if (this._isDestroyed !== false) return;

      this.glasses = new Glasses(response[2].children[0].geometry);
      this.model = response[1];

      state.scene.add(this.glasses);
      state.scene.add(this.video);

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();

      this.isLoaded = true;
    });
  },
  destroyed() {
    const { state, commit } = store;

    state.scene.remove(this.glasses);
    state.scene.remove(this.video);
    commit('destroyUpdate');
    commit('destroyResize');
    commit('processing/hide');
  },
  methods: {
    async update(time) {
      const { state } = store;

      this.timeSegment += time;
      if (this.timeSegment >= 1 / 60) {
        const predictions = await this.model.estimateFaces(state.webcam.video);
        if (predictions.length > 0) {
          this.glasses.update(predictions[0]);
          this.glasses.visible = true;
        } else {
          this.glasses.visible = false;
        }
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
div
  DemoOutline(
    v-if = 'isLoaded === false'
    :title = '$route.name'
    :description = '$route.meta.description'
    )
  DemoConsole(
    :title = '$route.name'
    )
</template>

<style lang="scss" scoped></style>
