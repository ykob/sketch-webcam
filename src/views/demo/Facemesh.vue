<script>
import { RepeatWrapping } from 'three';
import * as facemesh from '@tensorflow-models/facemesh';
import store from '@/store';

import DemoConsole from '@/components/demo/DemoConsole';
import PromiseTextureLoader from '@/webgl/common/PromiseTextureLoader';
import Video from '@/webgl/demo/facemesh/Video';
import Face from '@/webgl/demo/facemesh/Face';

export default {
  name: 'Facemesh',
  components: {
    DemoConsole
  },
  data: () => ({
    video: new Video(),
    faces: Array.apply(null, Array(10)).map(() => {
      return new Face();
    }),
    model: null,
    maxFaces: 5,
    timeSegment: 0
  }),
  created() {
    const { state, commit, dispatch } = store;

    commit('processing/show');
    Promise.all([
      dispatch('webcam/init'),
      facemesh.load({
        maxFaces: this.maxFaces,
        iouThreshold: 0.1
      }),
      PromiseTextureLoader(require('@/assets/img/tex_facemesh.jpg'))
    ]).then(response => {
      this.model = response[1];

      response[2].wrapS = RepeatWrapping;
      response[2].wrapT = RepeatWrapping;
      this.faces.forEach(face => {
        face.setUv(facemesh.FaceMesh.getUVCoords());
        face.setTexture(response[2]);
        state.scene.add(face);
      });
      state.scene.add(this.video);

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();
      commit('processing/hide');
    });
  },
  destroyed() {
    const { state, commit } = store;
    state.scene.remove(this.video);
    this.faces.forEach(face => {
      state.scene.remove(face);
    });
    this.faces = [];
    commit('destroyUpdate');
    commit('destroyResize');
  },
  methods: {
    async update(time) {
      const { state } = store;

      this.timeSegment += time;
      if (this.timeSegment >= 1 / 60) {
        const predictions = await this.model.estimateFaces(state.webcam.video);
        for (let index = 0; index < this.faces.length; index++) {
          const face = this.faces[index];
          if (predictions[index]) {
            face.visible = true;
            face.update(time, predictions[index]);
          } else {
            face.visible = false;
          }
        }
        this.timeSegment = 0;
      }
    },
    resize() {
      this.video.resize();
      this.faces.forEach(face => {
        face.resize();
      });
    }
  }
};
</script>

<template lang="pug">
DemoConsole(
  title = 'Facemesh'
  )
</template>

<style lang="scss" scoped></style>
