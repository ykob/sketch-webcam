import { Vector2 } from 'three';
import sleep from 'js-util/sleep';

export default {
  namespaced: true,
  state: {
    video: document.createElement('video'),
    resolution: new Vector2()
  },
  mutations: {
    playVideo(state) {
      // play video.
      state.video.play();
    },
    setVideoAttr(state, srcObject) {
      // get video stream, and set attributes to video object to play auto on iOS.
      state.video.srcObject = srcObject;
      state.video.setAttribute('playsinline', true);
      state.video.setAttribute('controls', true);
    },
    setResolution(state) {
      // get video resolution with promise.
      let x = state.video.videoWidth;
      let y = state.video.videoHeight;
      if (x > 640) {
        y = (y / x) * 640;
        x = 640;
      }
      state.resolution.x = state.video.width = x;
      state.resolution.y = state.video.height = y;
    }
  },
  actions: {
    async init({ commit }, facingMode = 'user') {
      if (!navigator.mediaDevices) {
        commit('alert/show', 'navigator.mediaDevices is disabled.', {
          root: true
        });
        throw new Error('navigator.mediaDevices is disabled.');
      }

      let srcObject;

      await navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: facingMode
          }
        })
        .then(stream => {
          srcObject = stream;
        })
        .catch(() => {
          commit('alert/show', "It's not allowed to use WebCam.", {
            root: true
          });
          throw new Error("It's not allowed to use WebCam.");
        });
      commit('setVideoAttr', srcObject);
      commit('playVideo', srcObject);
      await sleep(1000);
      commit('setResolution');

      return;
    }
  }
};
