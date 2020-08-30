<script>
import { RepeatWrapping } from 'three';
import * as facemesh from '@tensorflow-models/facemesh';
import sleep from 'js-util/sleep';

import DemoConsole from '@/components/demo/DemoConsole';
import DemoOutline from '@/components/demo/DemoOutline';
import PromiseTextureLoader from '@/webgl/common/PromiseTextureLoader';
import WebGLContent from '@/webgl/demo/facemesh/';

const MAX_FACES = 5;
const webglContent = new WebGLContent();
let model;
let timeSegment = 0;

export default {
  name: 'Facemesh',
  metaInfo: {
    title: 'Facemesh / '
  },
  components: {
    DemoConsole,
    DemoOutline
  },
  data: () => ({
    isLoaded: false,
    isStarted: false,
    isShownShareLinks: false
  }),
  async created() {
    const { commit } = this.$store;
    const timeStart = Date.now();

    Promise.all([
      PromiseTextureLoader(require('@/assets/img/view.jpg')),
      facemesh.load({
        maxFaces: MAX_FACES,
        iouThreshold: 0.1
      }),
      PromiseTextureLoader(require('@/assets/img/tex_facemesh.jpg'))
    ]).then(async response => {
      const time = Math.max(100, 2000 - Date.now() + timeStart);
      await sleep(time);

      if (this._isDestroyed !== false) return;

      response[2].wrapS = RepeatWrapping;
      response[2].wrapT = RepeatWrapping;

      model = response[1];
      webglContent.start(response[0], response[2]);

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();

      this.isLoaded = true;
    });
  },
  async destroyed() {
    const { commit } = this.$store;

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

<style lang="scss" scoped>
button {
  position: absolute;
  top: 50%;
}
</style>
