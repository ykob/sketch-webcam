import { Scene, WebGLRenderTarget } from 'three';
import * as facemesh from '@tensorflow-models/facemesh';

import store from '@/store/';

import View from '@/webgl/common/View';
import Video from './Video';
import Face from './Face';

const sceneView = new Scene();
const view = new View();
const video = new Video();
const faces = Array.apply(null, Array(10)).map(() => {
  return new Face();
});
const renderTarget1 = new WebGLRenderTarget();

export default class WebGLContent {
  constructor() {}
  start(viewTexture, faceTexture) {
    const { state } = store;

    view.start(renderTarget1.texture, viewTexture);
    faces.forEach(face => {
      face.setUv(facemesh.FaceMesh.getUVCoords());
      face.setTexture(faceTexture);
      sceneView.add(face);
    });
    state.scene.add(view);
    sceneView.add(video);
    video.start();
  }
  show() {
    view.show();
  }
  async destroy() {
    const { state } = store;

    await view.hide();
    state.scene.remove(view);
    sceneView.remove(video);
    faces.forEach(face => {
      sceneView.remove(face);
    });
  }
  async update(time, predictions) {
    const { state } = store;

    for (let index = 0; index < faces.length; index++) {
      const face = faces[index];
      if (predictions !== null && predictions[index]) {
        face.visible = true;
        face.update(time, predictions[index]);
      } else {
        face.visible = false;
      }
    }

    view.update(time);

    // Render the post effect.
    state.renderer.setRenderTarget(renderTarget1);
    state.renderer.render(sceneView, state.camera);

    state.renderer.setRenderTarget(null);
  }
  resize() {
    const { resolution } = store.state;

    video.resize();
    faces.forEach(face => {
      face.resize();
    });
    renderTarget1.setSize(resolution.x, resolution.y);
  }
}
