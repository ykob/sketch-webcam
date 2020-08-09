<script>
import { Scene, WebGLRenderTarget, RepeatWrapping } from 'three';
import * as facemesh from '@tensorflow-models/facemesh';
import sleep from 'js-util/sleep';

import DemoConsole from '@/components/demo/DemoConsole';
import DemoOutline from '@/components/demo/DemoOutline';
import PromiseTextureLoader from '@/webgl/common/PromiseTextureLoader';
import View from '@/webgl/common/View';
import Video from '@/webgl/demo/facemesh/Video';
import Face from '@/webgl/demo/facemesh/Face';

const MAX_FACES = 5;
const sceneView = new Scene();
const view = new View();
const video = new Video();
const faces = Array.apply(null, Array(10)).map(() => {
  return new Face();
});
const renderTarget1 = new WebGLRenderTarget();
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
    isStarted: false,
    isShownShareLinks: false
  }),
  async created() {
    const { state, commit } = this.$store;
    const timeStart = Date.now();

    Promise.all([
      PromiseTextureLoader(require('@/assets/img/view.jpg')),
      facemesh.load({
        maxFaces: MAX_FACES,
        iouThreshold: 0.1
      }),
      PromiseTextureLoader(require('@/assets/img/tex_facemesh.jpg'))
    ]).then(async response => {
      const time = Math.max(100, 2000 - Date.now() + timeStart);
      await sleep(time);

      if (this._isDestroyed !== false) return;

      model = response[1];
      view.start(renderTarget1.texture, response[0]);
      response[2].wrapS = RepeatWrapping;
      response[2].wrapT = RepeatWrapping;
      faces.forEach(face => {
        face.setUv(facemesh.FaceMesh.getUVCoords());
        face.setTexture(response[2]);
        sceneView.add(face);
      });
      state.scene.add(view);
      sceneView.add(video);
      video.start();
      video.visible = false;

      commit('setUpdate', this.update);
      commit('setResize', this.resize);
      this.resize();

      this.isLoaded = true;
    });
  },
  async destroyed() {
    const { state, commit } = this.$store;

    await view.hide();
    state.scene.remove(view);
    sceneView.remove(video);
    faces.forEach(face => {
      sceneView.remove(face);
    });
    commit('destroyUpdate');
    commit('destroyResize');
  },
  methods: {
    async update(time) {
      const { state } = this.$store;

      timeSegment += time;
      if (timeSegment >= 1 / 60) {
        video.visible = true;
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

      view.update(time);

      // Render the post effect.
      state.renderer.setRenderTarget(renderTarget1);
      state.renderer.render(sceneView, state.camera);

      state.renderer.setRenderTarget(null);
    },
    resize() {
      const { resolution } = this.$store.state;

      video.resize();
      faces.forEach(face => {
        face.resize();
      });
      renderTarget1.setSize(resolution.x, resolution.y);
    },
    async start() {
      const { commit } = this.$store;

      this.isStarted = true;
      commit('webcam/playVideo');
      await sleep(200);
      view.show();
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

<style lang="scss" scoped>
button {
  position: absolute;
  top: 50%;
}
</style>
