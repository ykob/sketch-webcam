<script>
import store from '@/store';
import Video from '@/components/demo/bodyPix/Video';

const video = new Video();

export default {
  name: 'BodyPix',
  async created() {
    const { state, dispatch } = store;

    await dispatch('webcam/init');
    video.resize();
    state.scene.add(video);
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
