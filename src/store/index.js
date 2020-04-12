import Vue from 'vue';
import Vuex from 'vuex';
import { Vector2 } from 'three';

import alert from './alert';
import webcam from './webcam';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    canvas: document.createElement('canvas'),
    resolution: new Vector2(),
    mouse: new Vector2(),
    isMobile: false,
    isEnabledTouch: false
  },
  mutations: {
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
