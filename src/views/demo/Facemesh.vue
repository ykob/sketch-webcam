<script>
import { RepeatWrapping } from 'three';
import * as facemesh from '@tensorflow-models/facemesh';
import store from '@/store';

import DemoConsole from '@/components/common/DemoConsole';
import PromiseTextureLoader from '@/components/common/PromiseTextureLoader';
import Video from '@/components/demo/facemesh/Video';
import Face from '@/components/demo/facemesh/Face';

const video = new Video();

export default {
  name: 'Facemesh',
  components: {
    DemoConsole
  },
  data: () => ({
    faces: [],
    model: null,
    maxFaces: 5,
    timeSegment: 0
  }),
  async created() {
    const { state, commit, dispatch } = store;

    for (let index = 0; index < 10; index++) {
      this.faces[index] = new Face();
      state.scene.add(this.faces[index]);
    }
    state.scene.add(video);

    dispatch('webcam/init').then(async () => {
      this.model = await facemesh.load({
        maxFaces: this.maxFaces,
        iouThreshold: 0.1
      });
      this.faces.forEach(face => {
        face.setUv(facemesh.FaceMesh.getUVCoords());
      });

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();
    });
    PromiseTextureLoader(require('@/assets/img/tex_facemesh.jpg')).then(
      response => {
        response.wrapS = RepeatWrapping;
        response.wrapT = RepeatWrapping;
        this.faces.forEach(face => {
          face.setTexture(response);
        });
      }
    );
  },
  destroyed() {
    const { state, commit } = store;
    state.scene.remove(video);
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
      video.resize();
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
