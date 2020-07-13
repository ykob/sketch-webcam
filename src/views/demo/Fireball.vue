<script>
import * as posenet from '@tensorflow-models/posenet';
import store from '@/store';

import DemoConsole from '@/components/demo/DemoConsole';
import KeyPointsGroup from '@/webgl/demo/fireball/KeyPointsGroup';
import FireBall from '@/webgl/demo/fireball/FireBall';
import Video from '@/webgl/demo/fireball/Video';

export default {
  name: 'Fireball',
  metaInfo: {
    title: 'Fireball / '
  },
  components: {
    DemoConsole
  },
  data: () => ({
    net: null,
    timeSegment: 0,
    fireBall: new FireBall(),
    video: new Video(),
    keyPoints: new KeyPointsGroup()
  }),
  created() {
    const { state, commit, dispatch } = store;

    commit('processing/show');
    Promise.all([
      dispatch('webcam/init'),
      posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 1,
        quantBytes: 4
      })
    ]).then(response => {
      if (this._isDestroyed !== false) return;

      this.net = response[1];

      state.scene.add(this.fireBall);
      state.scene.add(this.keyPoints);
      state.scene.add(this.video);

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();
      commit('processing/hide');
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
        this.fireBall.update(this.keyPoints.points.geometry.attributes);
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
DemoConsole(
  title = 'Fireball'
  )
</template>

<style lang="scss" scoped></style>
