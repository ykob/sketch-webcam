<script>
import * as facemesh from '@tensorflow-models/facemesh';
import sleep from 'js-util/sleep';

import DemoConsole from '@/components/demo/DemoConsole';
import DemoOutline from '@/components/demo/DemoOutline';
import PromiseOBJLoader from '@/webgl/common/PromiseOBJLoader';
import PromiseTextureLoader from '@/webgl/common/PromiseTextureLoader';
import WebGLContent from '@/webgl/demo/glasses/';

const webglContent = new WebGLContent();
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
    isLoaded: false,
    isStarted: false
  }),
  created() {
    const { commit } = this.$store;
    const timeStart = Date.now();

    Promise.all([
      PromiseTextureLoader(require('@/assets/img/view.jpg')),
      facemesh.load({
        maxFaces: 1
      }),
      PromiseOBJLoader(`${process.env.BASE_URL}obj/Glasses_01.obj`)
    ]).then(async response => {
      const time = Math.max(100, 2000 - Date.now() + timeStart);
      await sleep(time);

      if (this._isDestroyed !== false) return;

      model = response[1];
      webglContent.start(response[0], response[2].children[0].geometry);

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();

      this.isLoaded = true;
    });
  },
  async destroyed() {
    const { commit } = this.$store;

    await webglContent.destroy();
    commit('destroyUpdate');
    commit('destroyResize');
  },
  methods: {
    async update(time) {
      const { state } = this.$store;
      let predictions = null;

      timeSegment += time;
      if (timeSegment >= 1 / 60) {
        predictions = await model.estimateFaces(state.webcam.video);
        timeSegment = 0;
      }
      webglContent.update(time, predictions);
    },
    resize() {
      webglContent.resize();
    },
    async start() {
      const { commit } = this.$store;

      this.isStarted = true;
      commit('webcam/playVideo');
      await sleep(200);
      webglContent.show();
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
      v-if = 'isStarted === false'
      :title = '$route.name'
      :description = '$route.meta.description'
      :isLoaded = 'isLoaded'
      @click = 'start'
      )
    DemoConsole(
      v-if = 'isStarted === true'
      :title = '$route.name'
      )
</template>

<style lang="scss" scoped></style>
