<script>
import { Scene, WebGLRenderTarget } from 'three';
import * as facemesh from '@tensorflow-models/facemesh';
import sleep from 'js-util/sleep';

import DemoConsole from '@/components/demo/DemoConsole';
import DemoOutline from '@/components/demo/DemoOutline';
import PromiseOBJLoader from '@/webgl/common/PromiseOBJLoader';
import PromiseTextureLoader from '@/webgl/common/PromiseTextureLoader';
import View from '@/webgl/common/View';
import Glasses from '@/webgl/demo/glasses/Glasses';
import Video from '@/webgl/demo/glasses/Video';

const sceneView = new Scene();
const view = new View();
const video = new Video();
const renderTarget1 = new WebGLRenderTarget();
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
    isLoaded: false,
    isStarted: false
  }),
  created() {
    const { state, commit } = this.$store;
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
      view.start(renderTarget1.texture, response[0]);
      glasses = new Glasses(response[2].children[0].geometry);
      video.start();
      state.scene.add(view);
      sceneView.add(glasses);
      sceneView.add(video);

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();

      this.isLoaded = true;
    });
  },
  async destroyed() {
    const { state, commit } = this.$store;

    await view.hide();
    state.scene.remove(view);
    sceneView.remove(glasses);
    sceneView.remove(video);
    commit('destroyUpdate');
    commit('destroyResize');
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

      view.update(time);

      // Render the post effect.
      state.renderer.setRenderTarget(renderTarget1);
      state.renderer.render(sceneView, state.camera);

      state.renderer.setRenderTarget(null);
    },
    resize() {
      const { resolution } = this.$store.state;

      glasses.resize();
      video.resize();
      renderTarget1.setSize(resolution.x, resolution.y);
    },
    async start() {
      const { commit } = this.$store;

      this.isStarted = true;
      commit('webcam/playVideo');
      await sleep(200);
      view.show();
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
