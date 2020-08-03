<script>
import * as facemesh from '@tensorflow-models/facemesh';
import sleep from 'js-util/sleep';

import DemoConsole from '@/components/demo/DemoConsole';
import DemoOutline from '@/components/demo/DemoOutline';
import PromiseOBJLoader from '@/webgl/common/PromiseOBJLoader';
import Glasses from '@/webgl/demo/glasses/Glasses';
import Video from '@/webgl/demo/glasses/Video';

const video = new Video();
let glasses;
let model;
let timeSegment = 0;

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
    isLoaded: false
  }),
  created() {
    const { state, commit } = this.$store;
    const timeStart = Date.now();

    Promise.all([
      facemesh.load({
        maxFaces: 1
      }),
      PromiseOBJLoader(`${process.env.BASE_URL}obj/Glasses_01.obj`)
    ]).then(async response => {
      const time = Math.max(100, 2000 - Date.now() + timeStart);
      await sleep(time);

      if (this._isDestroyed !== false) return;

      glasses = new Glasses(response[1].children[0].geometry);
      model = response[0];

      video.start();
      state.scene.add(glasses);
      state.scene.add(video);

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();

      this.isLoaded = true;
    });
  },
  destroyed() {
    const { state, commit } = this.$store;

    state.scene.remove(glasses);
    state.scene.remove(video);
    commit('destroyUpdate');
    commit('destroyResize');
    commit('processing/hide');
  },
  methods: {
    async update(time) {
      const { state } = this.$store;

      timeSegment += time;
      if (timeSegment >= 1 / 60) {
        const predictions = await model.estimateFaces(state.webcam.video);
        if (predictions.length > 0) {
          glasses.update(predictions[0]);
          glasses.visible = true;
        } else {
          glasses.visible = false;
        }
        timeSegment = 0;
      }
    },
    resize() {
      glasses.resize();
      video.resize();
    },
    start() {
      const { commit } = this.$store;

      this.isLoaded = true;
      commit('webcam/playVideo');
    }
  }
};
</script>

<template lang="pug">
transition(
  name = 'page'
  appear
  )
  .page
    DemoOutline(
      v-if = 'isLoaded === false'
      :title = '$route.name'
      :description = '$route.meta.description'
      )
    DemoConsole(
      v-if = 'isLoaded === true'
      :title = '$route.name'
      )
</template>

<style lang="scss" scoped></style>
