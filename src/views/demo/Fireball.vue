<script>
import { Scene, WebGLRenderTarget, RepeatWrapping } from 'three';
import * as posenet from '@tensorflow-models/posenet';
import sleep from 'js-util/sleep';

import DemoConsole from '@/components/demo/DemoConsole';
import DemoOutline from '@/components/demo/DemoOutline';
import PromiseTextureLoader from '@/webgl/common/PromiseTextureLoader';
import View from '@/webgl/common/View';
import KeyPointsGroup from '@/webgl/demo/fireball/KeyPointsGroup';
import FireBall from '@/webgl/demo/fireball/FireBall';
import Video from '@/webgl/demo/fireball/Video';

const sceneView = new Scene();
const view = new View();
const fireBall = new FireBall();
const video = new Video();
const keyPoints = new KeyPointsGroup();
const renderTarget1 = new WebGLRenderTarget();
let net = null;
let timeSegment = 0;

export default {
  name: 'Fireball',
  metaInfo: {
    title: 'Fireball / '
  },
  components: {
    DemoOutline,
    DemoConsole
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
      posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 1,
        quantBytes: 4
      }),
      PromiseTextureLoader(require('@/assets/img/fireball.jpg')),
      PromiseTextureLoader(require('@/assets/img/noise.jpg'))
    ]).then(async response => {
      const time = Math.max(100, 2000 - Date.now() + timeStart);
      await sleep(time);

      if (this._isDestroyed !== false) return;

      response[2].wrapS = RepeatWrapping;
      response[3].wrapS = RepeatWrapping;
      response[3].wrapT = RepeatWrapping;

      net = response[1];
      view.start(renderTarget1.texture, response[0]);
      video.start();
      fireBall.start(response[2], response[3]);
      state.scene.add(view);
      sceneView.add(fireBall);
      sceneView.add(keyPoints);
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
    sceneView.remove(fireBall);
    sceneView.remove(keyPoints);
    sceneView.remove(video);
    commit('destroyUpdate');
    commit('destroyResize');
  },
  methods: {
    async update(time) {
      const { state } = this.$store;

      timeSegment += time;
      if (timeSegment >= 1 / 60) {
        const pose = await net.estimateSinglePose(state.webcam.video);
        keyPoints.update(pose.keypoints);
        fireBall.update(time, keyPoints.points.geometry.attributes);
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

      video.resize();
      keyPoints.resize();
      fireBall.resize();
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
