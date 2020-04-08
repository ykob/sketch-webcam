export default {
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
};
