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
import PostEffectBright from '@/webgl/common/PostEffectBright';
import PostEffectGodray from '@/webgl/demo/fireball/PostEffectGodray';
import PostEffectTotal from '@/webgl/demo/fireball/PostEffectTotal';
import Video from '@/webgl/demo/fireball/Video';

const sceneView = new Scene();
const view = new View();
const fireBall = new FireBall();
const postEffectBright = new PostEffectBright();
const postEffectGodray = new PostEffectGodray();
const postEffectTotal = new PostEffectTotal();
const video = new Video();
const keyPoints = new KeyPointsGroup();
const renderTarget1 = new WebGLRenderTarget();
const renderTarget2 = new WebGLRenderTarget();
const renderTarget3 = new WebGLRenderTarget();
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
      view.start(renderTarget3.texture, response[0]);
      video.start();
      fireBall.start(response[2], response[3]);
      postEffectBright.start(renderTarget1.texture);
      postEffectGodray.start(renderTarget2.texture);
      postEffectTotal.start(renderTarget1.texture, renderTarget2.texture);
      state.scene.add(view);
      sceneView.add(fireBall);
      sceneView.add(keyPoints);
      sceneView.add(video);

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();

      await sleep(100);
      this.isLoaded = true;
    });
  },
  async destroyed() {
    const { state, commit } = this.$store;

    await view.hide();
    state.scene.remove(view);
    commit('destroyUpdate');
    commit('destroyResize');
  },
  methods: {
    async update(time) {
      const { state } = this.$store;

      timeSegment += time;
      if (timeSegment >= 1 / 60) {
        const pose = await net.estimateMultiplePoses(state.webcam.video, {
          maxDetections: 3
        });
        keyPoints.update(pose[0].keypoints);
        fireBall.update(time, keyPoints.points.geometry.attributes);
        timeSegment = 0;
      }

      postEffectGodray.update(fireBall.position);
      view.update(time);

      // Render the post effect.
      sceneView.add(fireBall);
      state.renderer.setRenderTarget(renderTarget1);
      state.renderer.render(sceneView, state.camera);
      sceneView.remove(fireBall);

      sceneView.add(postEffectBright);
      state.renderer.setRenderTarget(renderTarget2);
      state.renderer.render(sceneView, state.camera);
      sceneView.remove(postEffectBright);

      sceneView.add(postEffectGodray);
      state.renderer.setRenderTarget(renderTarget1);
      state.renderer.render(sceneView, state.camera);
      sceneView.remove(postEffectGodray);

      sceneView.add(fireBall);
      sceneView.add(keyPoints);
      sceneView.add(video);
      state.renderer.setRenderTarget(renderTarget2);
      state.renderer.render(sceneView, state.camera);
      sceneView.remove(fireBall);
      sceneView.remove(keyPoints);
      sceneView.remove(video);

      sceneView.add(postEffectTotal);
      state.renderer.setRenderTarget(renderTarget3);
      state.renderer.render(sceneView, state.camera);
      sceneView.remove(postEffectTotal);

      state.renderer.setRenderTarget(null);
    },
    resize() {
      const { resolution } = this.$store.state;

      video.resize();
      keyPoints.resize();
      renderTarget1.setSize(resolution.x, resolution.y);
      renderTarget2.setSize(resolution.x, resolution.y);
      renderTarget3.setSize(resolution.x, resolution.y);
    },
    async start() {
      this.isStarted = true;
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
