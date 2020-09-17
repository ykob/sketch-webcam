import { Vector2, VideoTexture } from 'three';
import sleep from 'js-util/sleep';

const video = document.createElement('video');

export default {
  namespaced: true,
  state: {
    video,
    resolution: new Vector2(),
    facingMode: '',
    videoTexture: null
  },
  mutations: {
    playVideo() {
      // play video.
      video.play();
    },
    setFacingMode(state, facingMode) {
      state.facingMode = facingMode;
    },
    setResolution(state) {
      // get video resolution with promise.
      let x = video.videoWidth;
      let y = video.videoHeight;
      state.resolution.set(x, y);
      video.width = x;
      video.height = y;
    },
    createVideoTexture(state) {
      state.videoTexture = new VideoTexture(video);
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

      // get video stream, and set attributes to video object to play auto on iOS.
      video.srcObject = srcObject;
      video.setAttribute('playsinline', true);
      video.setAttribute('controls', true);

      // append the video element to run normally on Safari and Mobile Safari.
      video.style.width = '0px';
      video.style.height = '0px';
      document.body.append(video);

      await sleep(1000);
      commit('setResolution');
      commit('createVideoTexture');
      video.play();

      return;
    }
  }
};
