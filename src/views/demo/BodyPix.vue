<script>
import * as bodyPix from '@tensorflow-models/body-pix';
import store from '@/store';

import DemoConsole from '@/components/common/DemoConsole';
import Video from '@/components/demo/bodyPix/Video';

const video = new Video();

export default {
  name: 'BodyPix',
  components: {
    DemoConsole
  },
  data: () => ({
    net: null,
    timeSegment: 0
  }),
  async created() {
    const { state, commit, dispatch } = store;

    state.scene.add(video);

    dispatch('webcam/init').then(async () => {
      this.net = await bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 0.75,
        quantBytes: 4
      });

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();
    });
  },
  destroyed() {
    const { state, commit } = store;
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
          segmentationThreshold: 0.5
        });
        video.updateSegmentation(segmentation);
        this.timeSegment = 0;
      }
    },
    resize() {
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
