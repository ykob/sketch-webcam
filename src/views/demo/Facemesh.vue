<script>
import { RepeatWrapping } from 'three';
import * as facemesh from '@tensorflow-models/facemesh';
import sleep from 'js-util/sleep';

import DemoConsole from '@/components/demo/DemoConsole';
import DemoOutline from '@/components/demo/DemoOutline';
import PromiseTextureLoader from '@/webgl/common/PromiseTextureLoader';
import Video from '@/webgl/demo/facemesh/Video';
import Face from '@/webgl/demo/facemesh/Face';

const MAX_FACES = 5;
const video = new Video();
const faces = Array.apply(null, Array(10)).map(() => {
  return new Face();
});
let model;
let timeSegment = 0;

export default {
  name: 'Facemesh',
  metaInfo: {
    title: 'Facemesh / '
  },
  components: {
    DemoConsole,
    DemoOutline
  },
  data: () => ({
    isLoaded: false,
    isShownShareLinks: false
  }),
  async created() {
    const { state, commit } = this.$store;
    const timeStart = Date.now();

    Promise.all([
      facemesh.load({
        maxFaces: MAX_FACES,
        iouThreshold: 0.1
      }),
      PromiseTextureLoader(require('@/assets/img/tex_facemesh.jpg'))
    ]).then(async response => {
      const time = Math.max(100, 2000 - Date.now() + timeStart);
      await sleep(time);

      if (this._isDestroyed !== false) return;

      model = response[0];

      response[1].wrapS = RepeatWrapping;
      response[1].wrapT = RepeatWrapping;
      faces.forEach(face => {
        face.setUv(facemesh.FaceMesh.getUVCoords());
        face.setTexture(response[1]);
        state.scene.add(face);
      });
      state.scene.add(video);
      video.start();

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();

      this.isLoaded = true;
    });
  },
  destroyed() {
    const { state, commit } = this.$store;
    state.scene.remove(video);
    faces.forEach(face => {
      state.scene.remove(face);
    });
    commit('destroyUpdate');
    commit('destroyResize');
    commit('processing/hide');
  },
  methods: {
    async update(time) {
      const { state } = this.$store;

      if (this.isLoaded === false) return;

      timeSegment += time;
      if (timeSegment >= 1 / 60) {
        const predictions = await model.estimateFaces(state.webcam.video);
        for (let index = 0; index < faces.length; index++) {
          const face = faces[index];
          if (predictions[index]) {
            face.visible = true;
            face.update(time, predictions[index]);
          } else {
            face.visible = false;
          }
        }
        timeSegment = 0;
      }
    },
    resize() {
      video.resize();
      faces.forEach(face => {
        face.resize();
      });
    },
    start() {
      const { commit } = this.$store;

      this.isLoaded = true;
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
      v-if = 'isLoaded === false'
      :title = '$route.name'
      :description = '$route.meta.description'
      )
    DemoConsole(
      v-if = 'isLoaded === true'
      :title = '$route.name'
      )
</template>

<style lang="scss" scoped>
button {
  position: absolute;
  top: 50%;
}
</style>
