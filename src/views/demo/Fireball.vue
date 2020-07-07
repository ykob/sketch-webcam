<script>
import * as posenet from '@tensorflow-models/posenet';
import store from '@/store';

import DemoConsole from '@/components/demo/DemoConsole';
import KeyPointsGroup from '@/webgl/demo/fireball/KeyPointsGroup';
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
        multiplier: 0.75,
        quantBytes: 4
      })
    ]).then(response => {
      if (this._isDestroyed !== false) return;

      this.net = response[1];

      state.scene.add(this.video);
      state.scene.add(this.keyPoints);

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();
      commit('processing/hide');
    });
  },
  destroyed() {
    const { state, commit } = store;
    state.scene.remove(this.video);
    state.scene.remove(this.keyPoints);

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
