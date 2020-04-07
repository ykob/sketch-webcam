import Vue from 'vue';
import Vuex from 'vuex';
import { Vector2 } from 'three';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    canvas: document.createElement('canvas'),
    resolution: new Vector2(),
    mouse: new Vector2(),
    webcam: null,
    isMobile: false,
    isEnabledTouch: false
  },
  mutations: {
    setWebCam(state, webcam) {
      state.webcam = webcam;
    },
    changeMediaQuery(state, bool) {
      state.isMobile = bool;
    }
  },
  actions: {
    async initWebCam({ state, commit }) {
      const WebCam = await import('@/components/common/WebCam.js');
      commit('setWebCam', new WebCam.default());
      return state.webcam.init();
    }
  },
  modules: {}
});
