<script>
import * as bodyPix from '@tensorflow-models/body-pix';
import { Scene, WebGLRenderTarget } from 'three';
import store from '@/store';

import DemoConsole from '@/components/common/DemoConsole';
import Body from '@/components/demo/bodyPix/Body';
import Video from '@/components/demo/bodyPix/Video';

const body = new Body();
const video = new Video();

export default {
  name: 'BodyPix',
  components: {
    DemoConsole
  },
  data: () => ({
    net: null,
    timeSegment: 0,
    subScene: new Scene(),
    renderTarget: new WebGLRenderTarget()
  }),
  async created() {
    const { state, commit, dispatch } = store;

    video.start(this.renderTarget.texture);
    this.subScene.add(body);
    state.scene.add(video);

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
    this.subScene.remove(body);
    state.scene.remove(video);
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
        body.updateSegmentation(segmentation);
        this.timeSegment = 0;
      }

      state.renderer.setRenderTarget(this.renderTarget);
      state.renderer.render(this.subScene, state.camera);
      state.renderer.setRenderTarget(null);
    },
    resize() {
      const { resolution } = store.state;

      this.renderTarget.setSize(resolution.x, resolution.y);
      body.resize();
      video.resize();
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
