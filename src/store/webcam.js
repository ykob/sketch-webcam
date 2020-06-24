import { Vector2 } from 'three';
import sleep from 'js-util/sleep';

export default {
  namespaced: true,
  state: {
    video: document.createElement('video'),
    resolution: new Vector2(),
    facingMode: ''
  },
  mutations: {
    playVideo(state) {
      // play video.
      state.video.play();
    },
    setFacingMode(state, facingMode) {
      state.facingMode = facingMode;
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
      state.resolution.set(x, y);
      state.video.width = x;
      state.video.height = y;
    }
  },
  actions: {
    async init({ state, commit }, facingMode = 'user') {
      if (facingMode === state.facingMode) {
        return;
      }
      if (!navigator.mediaDevices) {
        commit('modal/show', 'navigator.mediaDevices is disabled.', {
          root: true
        });
        throw new Error('navigator.mediaDevices is disabled.');
      }

      let srcObject;

      commit('setFacingMode', facingMode);
      await navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            width: 1920,
            facingMode: facingMode
          }
        })
        .then(stream => {
          srcObject = stream;
        })
        .catch(() => {
          commit('modal/show', "It's not allowed to use WebCam.", {
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
