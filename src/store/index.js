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
    isMobile: false,
    isEnabledTouch: false
  },
  mutations: {
    setUpdates(state, update) {
      state.update = update;
    },
    destroyUpdates(state, update) {
      state.update = update;
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
