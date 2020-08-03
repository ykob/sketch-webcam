<script>
import * as bodyPix from '@tensorflow-models/body-pix';
import { Scene, WebGLRenderTarget } from 'three';
import sleep from 'js-util/sleep';

import DemoConsole from '@/components/demo/DemoConsole';
import DemoOutline from '@/components/demo/DemoOutline';
import PostEffectBlur from '@/webgl/common/PostEffectBlur';
import PromiseOBJLoader from '@/webgl/common/PromiseOBJLoader';
import Blob from '@/webgl/demo/bodyPix/Blob';
import Body from '@/webgl/demo/bodyPix/Body';
import Video from '@/webgl/demo/bodyPix/Video';
import VideoBack from '@/webgl/demo/bodyPix/VideoBack';

const scenePE = new Scene();
const body = new Body();
const video = new Video();
const videoBack = new VideoBack();
const postEffectBlurX = new PostEffectBlur();
const postEffectBlurY = new PostEffectBlur();
const renderTarget1 = new WebGLRenderTarget();
const renderTarget2 = new WebGLRenderTarget();
let net = null;
let blobs = Array.apply(null, Array(10)).map(() => {
  return undefined;
});
let timeSegment = 0;

export default {
  name: 'BodyPix',
  metaInfo: {
    title: 'BodyPix / '
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
      bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 0.5,
        quantBytes: 4
      }),
      PromiseOBJLoader(`${process.env.BASE_URL}obj/star.obj`)
    ]).then(async response => {
      const time = Math.max(100, 2000 - Date.now() + timeStart);
      await sleep(time);

      if (this._isDestroyed !== false) return;

      net = response[0];
      video.start(renderTarget1.texture);
      videoBack.start(renderTarget1.texture);
      postEffectBlurX.start(renderTarget1.texture, 1, 0);
      postEffectBlurX.setScale(0.5, 0.5);
      postEffectBlurY.start(renderTarget2.texture, 0, 1);
      postEffectBlurY.setScale(0.5, 0.5);
      blobs = blobs.map(() => {
        return new Blob(response[1].children[0].geometry);
      });
      blobs.forEach(blob => {
        state.scene.add(blob);
      });
      state.scene.add(video);
      state.scene.add(videoBack);

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();

      this.isLoaded = true;
      if (state.webcam.isPlaying === true) {
        this.isStarted = true;
      }
    });
  },
  destroyed() {
    const { state, commit } = this.$store;
    state.scene.remove(video);
    state.scene.remove(videoBack);
    blobs.forEach(blob => {
      state.scene.remove(blob);
    });

    commit('destroyUpdate');
    commit('destroyResize');
    commit('processing/hide');
  },
  methods: {
    async update(time) {
      const { state } = this.$store;

      if (this.isStarted === false) return;

      timeSegment += time;
      if (timeSegment >= 1 / 60) {
        const segmentation = await net.segmentPerson(state.webcam.video, {
          flipHorizontal: true,
          internalResolution: 'low',
          segmentationThreshold: 0.8
        });
        body.updateSegmentation(segmentation);
        timeSegment = 0;
      }

      blobs.forEach(blob => {
        blob.update(time);
      });

      // // Render the post effect.
      scenePE.add(body);
      state.renderer.setRenderTarget(renderTarget1);
      state.renderer.render(scenePE, state.camera);
      scenePE.remove(body);

      scenePE.add(postEffectBlurX);
      state.renderer.setRenderTarget(renderTarget2);
      state.renderer.render(scenePE, state.camera);
      scenePE.remove(postEffectBlurX);

      scenePE.add(postEffectBlurY);
      state.renderer.setRenderTarget(renderTarget1);
      state.renderer.render(scenePE, state.camera);
      scenePE.remove(postEffectBlurY);

      state.renderer.setRenderTarget(null);
    },
    resize() {
      const { resolution } = this.$store.state;
      body.resize();
      video.resize();
      videoBack.resize();
      postEffectBlurY.resize();
      postEffectBlurX.resize();
      renderTarget1.setSize(resolution.x, resolution.y);
      renderTarget2.setSize(resolution.x, resolution.y);
    },
    start() {
      const { commit } = this.$store;

      this.isStarted = true;
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
