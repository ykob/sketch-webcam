<script>
import * as posenet from '@tensorflow-models/posenet';
import sleep from 'js-util/sleep';

import DemoConsole from '@/components/demo/DemoConsole';
import DemoOutline from '@/components/demo/DemoOutline';
import KeyPointsGroup from '@/webgl/demo/fireball/KeyPointsGroup';
import FireBall from '@/webgl/demo/fireball/FireBall';
import Video from '@/webgl/demo/fireball/Video';

const fireBall = new FireBall();
const video = new Video();
const keyPoints = new KeyPointsGroup();
let net = null;
let timeSegment = 0;

export default {
  name: 'Fireball',
  metaInfo: {
    title: 'Fireball / '
  },
  components: {
    DemoOutline,
    DemoConsole
  },
  data: () => ({
    isLoaded: false,
    isStarted: false
  }),
  created() {
    const { state, commit } = this.$store;
    const timeStart = Date.now();

    Promise.all([
      posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 1,
        quantBytes: 4
      })
    ]).then(async response => {
      const time = Math.max(100, 2000 - Date.now() + timeStart);
      await sleep(time);

      if (this._isDestroyed !== false) return;

      net = response[0];

      video.start();
      state.scene.add(fireBall);
      state.scene.add(keyPoints);
      state.scene.add(video);

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
    state.scene.remove(fireBall);
    state.scene.remove(keyPoints);
    state.scene.remove(video);

    commit('destroyUpdate');
    commit('destroyResize');
  },
  methods: {
    async update(time) {
      const { state } = this.$store;

      if (this.isStarted === false) return;

      timeSegment += time;
      if (timeSegment >= 1 / 60) {
        const pose = await net.estimateSinglePose(state.webcam.video);
        keyPoints.update(pose.keypoints);
        fireBall.update(time, keyPoints.points.geometry.attributes);
        timeSegment = 0;
      }
    },
    resize() {
      video.resize();
      keyPoints.resize();
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
