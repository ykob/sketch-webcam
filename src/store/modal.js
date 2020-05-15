export default {
  namespaced: true,
  state: {
    text: '',
    isShown: false
  },
  mutations: {
    show(state, text) {
      state.isShown = true;
      state.text = text;
    },
    hide(state) {
      state.isShown = false;
    }
  }
};
