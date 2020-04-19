<script>
import * as bodyPix from '@tensorflow-models/body-pix';
import store from '@/store';
import Video from '@/components/demo/bodyPix/Video';

const video = new Video();

export default {
  name: 'BodyPix',
  data: () => ({
    net: null
  }),
  async created() {
    const { state, commit, dispatch } = store;

    await dispatch('webcam/init');
    video.resize();
    this.net = await bodyPix.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 4
    });
    state.scene.add(video);

    let timeSegment = 0;
    commit('setUpdates', async time => {
      timeSegment += time;
      if (timeSegment >= 1 / 30) {
        const segmentation = await this.net.segmentPerson(state.webcam.video, {
          flipHorizontal: true,
          internalResolution: 'medium',
          segmentationThreshold: 0.5
        });
        video.updateSegmentation(segmentation);
        timeSegment = 0;
      }
    });
  },
  destroyed() {
    const { scene } = store.state;
    scene.remove(video);
  }
};
</script>

<template lang="pug">
h1 BodyPix
</template>

<style lang="scss" scoped></style>
