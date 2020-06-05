<script>
import * as bodyPix from '@tensorflow-models/body-pix';
import { Scene, WebGLRenderTarget } from 'three';
import store from '@/store';

import DemoConsole from '@/components/common/DemoConsole';
import PostEffectBlur from '@/webgl/common/PostEffectBlur';
import Body from '@/webgl/demo/bodyPix/Body';
import Video from '@/webgl/demo/bodyPix/Video';

export default {
  name: 'BodyPix',
  components: {
    DemoConsole
  },
  data: () => ({
    net: null,
    timeSegment: 0,
    scenePE: new Scene(),
    body: new Body(),
    video: new Video(),
    postEffectBlurX: new PostEffectBlur(),
    postEffectBlurY: new PostEffectBlur(),
    renderTarget1: new WebGLRenderTarget(),
    renderTarget2: new WebGLRenderTarget()
  }),
  async created() {
    const { state, commit, dispatch } = store;

    this.video.start(this.renderTarget1.texture);
    this.postEffectBlurX.start(this.renderTarget1.texture, 1, 0);
    this.postEffectBlurY.start(this.renderTarget2.texture, 0, 1);
    state.scene.add(this.video);

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
    commit('destroyUpdate');
    commit('destroyResize');
  },
  methods: {
    async update(time) {
      const { state } = store;

      this.timeSegment += time;
      if (this.timeSegment >= 1 / 30) {
        const segmentation = await this.net.segmentPerson(state.webcam.video, {
          flipHorizontal: true,
          internalResolution: 'medium',
          segmentationThreshold: 0.7
        });
        this.body.updateSegmentation(segmentation);
        this.timeSegment = 0;
      }

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
