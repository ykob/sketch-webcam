<script>
import store from '@/store';
import Video from '@/components/demo/bodyPix/Video';

const video = new Video();

export default {
  name: 'BodyPix',
  created() {
    const { scene } = store.state;
    video.resize();
    scene.add(video);
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
