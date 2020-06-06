<script>
import * as bodyPix from '@tensorflow-models/body-pix';
import { Scene, WebGLRenderTarget } from 'three';
import store from '@/store';

import DemoConsole from '@/components/common/DemoConsole';
import PostEffectBlur from '@/webgl/common/PostEffectBlur';
import Blob from '@/webgl/demo/bodyPix/Blob';
import Body from '@/webgl/demo/bodyPix/Body';
import Video from '@/webgl/demo/bodyPix/Video';
import VideoBack from '@/webgl/demo/bodyPix/VideoBack';

const arr = [1, 2, 3, 4, 5, 6];
const blobs = arr.map(() => {
  return new Blob();
});

export default {
  name: 'BodyPix',
  components: {
    DemoConsole
  },
  data: () => ({
    net: null,
    timeSegment: 0,
    scenePE: new Scene(),
    blobs: blobs,
    body: new Body(),
    video: new Video(),
    videoBack: new VideoBack(),
    postEffectBlurX: new PostEffectBlur(),
    postEffectBlurY: new PostEffectBlur(),
    renderTarget1: new WebGLRenderTarget(),
    renderTarget2: new WebGLRenderTarget()
  }),
  async created() {
    const { state, commit, dispatch } = store;

    this.video.start(this.renderTarget1.texture);
    this.videoBack.start(this.renderTarget1.texture);
    this.postEffectBlurX.start(this.renderTarget1.texture, 1, 0);
    this.postEffectBlurX.setScale(0.5, 0.5);
    this.postEffectBlurY.start(this.renderTarget2.texture, 0, 1);
    this.postEffectBlurY.setScale(0.5, 0.5);
    this.blobs.forEach(blob => {
      state.scene.add(blob);
    });
    state.scene.add(this.video);
    state.scene.add(this.videoBack);

    dispatch('webcam/init').then(async () => {
      this.net = await bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 0.5,
        quantBytes: 4
      });

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();
    });
  },
  destroyed() {
    const { state, commit } = store;
    state.scene.remove(this.video);
    state.scene.remove(this.videoBack);
    this.blobs.forEach(blob => {
      state.scene.remove(blob);
    });
    commit('destroyUpdate');
    commit('destroyResize');
  },
  methods: {
    async update(time) {
      const { state } = store;

      this.timeSegment += time;
      if (this.timeSegment >= 1 / 60) {
        const segmentation = await this.net.segmentPerson(state.webcam.video, {
          flipHorizontal: true,
          internalResolution: 'low',
          segmentationThreshold: 0.8
        });
        this.body.updateSegmentation(segmentation);
        this.timeSegment = 0;
      }

      this.blobs.forEach(blob => {
        blob.update(time);
      });

      // // Render the post effect.
      this.scenePE.add(this.body);
      state.renderer.setRenderTarget(this.renderTarget1);
      state.renderer.render(this.scenePE, state.camera);
      this.scenePE.remove(this.body);

      this.scenePE.add(this.postEffectBlurX);
      state.renderer.setRenderTarget(this.renderTarget2);
      state.renderer.render(this.scenePE, state.camera);
      this.scenePE.remove(this.postEffectBlurX);

      this.scenePE.add(this.postEffectBlurY);
      state.renderer.setRenderTarget(this.renderTarget1);
      state.renderer.render(this.scenePE, state.camera);
      this.scenePE.remove(this.postEffectBlurY);

      state.renderer.setRenderTarget(null);
    },
    resize() {
      const { resolution } = store.state;
      this.body.resize();
      this.video.resize();
      this.videoBack.resize();
      this.postEffectBlurY.resize();
      this.postEffectBlurX.resize();
      this.renderTarget1.setSize(resolution.x, resolution.y);
      this.renderTarget2.setSize(resolution.x, resolution.y);
    }
  }
};
</script>

<template lang="pug">
DemoConsole(
  title = 'BodyPix'
  )
</template>

<style lang="scss" scoped></style>
