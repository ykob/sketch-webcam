import Vue from 'vue';
import Vuex from 'vuex';
import { Vector2 } from 'three';

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
    webcam: {
      namespaced: true,
      state: {
        obj: null
      },
      mutations: {
        set(state, webcam) {
          state.obj = webcam;
        }
      },
      actions: {
        async init({ state, commit }) {
          const WebCam = await import('@/components/common/WebCam.js');
          commit('set', new WebCam.default());
          return state.obj.init();
        }
      }
    }
  }
});
