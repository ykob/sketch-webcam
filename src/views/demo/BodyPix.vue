<script>
import * as bodyPix from '@tensorflow-models/body-pix';
import { Scene, WebGLRenderTarget } from 'three';
import sleep from 'js-util/sleep';
import store from '@/store';

import DemoConsole from '@/components/demo/DemoConsole';
import DemoOutline from '@/components/demo/DemoOutline';
import PostEffectBlur from '@/webgl/common/PostEffectBlur';
import PromiseOBJLoader from '@/webgl/common/PromiseOBJLoader';
import Blob from '@/webgl/demo/bodyPix/Blob';
import Body from '@/webgl/demo/bodyPix/Body';
import Video from '@/webgl/demo/bodyPix/Video';
import VideoBack from '@/webgl/demo/bodyPix/VideoBack';

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
    net: null,
    timeSegment: 0,
    scenePE: new Scene(),
    blobs: Array.apply(null, Array(10)).map(() => {
      return undefined;
    }),
    body: new Body(),
    video: new Video(),
    videoBack: new VideoBack(),
    postEffectBlurX: new PostEffectBlur(),
    postEffectBlurY: new PostEffectBlur(),
    renderTarget1: new WebGLRenderTarget(),
    renderTarget2: new WebGLRenderTarget()
  }),
  created() {
    const { state, commit, dispatch } = store;
    const timeStart = Date.now();

    Promise.all([
      dispatch('webcam/init'),
      bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 0.5,
        quantBytes: 4
      }),
      PromiseOBJLoader(`${process.env.BASE_URL}obj/star.obj`)
    ]).then(async response => {
      if (this._isDestroyed !== false) return;

      const time = Math.max(100, 2000 - Date.now() + timeStart);
      await sleep(time);
      this.isLoaded = true;
      await sleep(500);

      this.net = response[1];
      this.video.start(this.renderTarget1.texture);
      this.videoBack.start(this.renderTarget1.texture);
      this.postEffectBlurX.start(this.renderTarget1.texture, 1, 0);
      this.postEffectBlurX.setScale(0.5, 0.5);
      this.postEffectBlurY.start(this.renderTarget2.texture, 0, 1);
      this.postEffectBlurY.setScale(0.5, 0.5);
      this.blobs = this.blobs.map(() => {
        return new Blob(response[2].children[0].geometry);
      });
      this.blobs.forEach(blob => {
        state.scene.add(blob);
      });
      state.scene.add(this.video);
      state.scene.add(this.videoBack);

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
    commit('processing/hide');
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
