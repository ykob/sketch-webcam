import Vue from 'vue';
import Vuex from 'vuex';
import { WebGLRenderer, Vector2, Scene, Clock } from 'three';

import alert from './alert';
import webcam from './webcam';

import Camera from '@/components/common/Camera';

Vue.use(Vuex);

const canvas = document.createElement('canvas');

export default new Vuex.Store({
  state: {
    canvas,
    resolution: new Vector2(),
    mouse: new Vector2(),
    renderer: new WebGLRenderer({
      alpha: true,
      antialias: false,
      canvas: canvas
    }),
    scene: new Scene(),
    camera: new Camera(),
    clock: new Clock(),
    update: null,
    resize: null,
    isMobile: false,
    isEnabledTouch: false
  },
  mutations: {
    setUpdate(state, update) {
      state.update = update;
    },
    destroyUpdate(state) {
      state.update = null;
    },
    setResize(state, resize) {
      state.resize = resize;
    },
    destroyResize(state) {
      state.resize = null;
    },
    changeMediaQuery(state, bool) {
      state.isMobile = bool;
    }
  },
  actions: {},
  modules: {
    alert,
    webcam
  }
});
