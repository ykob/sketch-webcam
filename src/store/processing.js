export default {
  namespaced: true,
  state: {
    isShown: false
  },
  mutations: {
    show(state) {
      state.isShown = true;
    },
    hide(state) {
      state.isShown = false;
    }
  }
};
