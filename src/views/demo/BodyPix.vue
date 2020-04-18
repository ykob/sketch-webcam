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
    this.net = await bodyPix.load();
    state.scene.add(video);

    commit('setUpdates', async () => {
      const segmentation = await this.net.segmentPerson(state.webcam.video, {
        internalResolution: 'low'
      });
      console.log(segmentation);
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
