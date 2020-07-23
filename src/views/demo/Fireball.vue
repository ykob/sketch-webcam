<script>
import * as posenet from '@tensorflow-models/posenet';
import sleep from 'js-util/sleep';
import store from '@/store';

import DemoConsole from '@/components/demo/DemoConsole';
import DemoOutline from '@/components/demo/DemoOutline';
import KeyPointsGroup from '@/webgl/demo/fireball/KeyPointsGroup';
import FireBall from '@/webgl/demo/fireball/FireBall';
import Video from '@/webgl/demo/fireball/Video';

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
    net: null,
    timeSegment: 0,
    fireBall: new FireBall(),
    video: new Video(),
    keyPoints: new KeyPointsGroup()
  }),
  created() {
    const { state, commit, dispatch } = store;
    const timeStart = Date.now();

    Promise.all([
      dispatch('webcam/init'),
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

      this.net = response[1];

      state.scene.add(this.fireBall);
      state.scene.add(this.keyPoints);
      state.scene.add(this.video);

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();

      this.isLoaded = true;
    });
  },
  destroyed() {
    const { state, commit } = store;
    state.scene.remove(this.fireBall);
    state.scene.remove(this.keyPoints);
    state.scene.remove(this.video);

    commit('destroyUpdate');
    commit('destroyResize');
    commit('processing/hide');
  },
  methods: {
    async update(time) {
      const { state } = store;

      this.timeSegment += time;
      if (this.timeSegment >= 1 / 60) {
        const pose = await this.net.estimateSinglePose(state.webcam.video);
        this.keyPoints.update(pose.keypoints);
        this.fireBall.update(time, this.keyPoints.points.geometry.attributes);
        this.timeSegment = 0;
      }
    },
    resize() {
      this.video.resize();
      this.keyPoints.resize();
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
