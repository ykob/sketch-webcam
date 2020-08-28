import { Scene, WebGLRenderTarget } from 'three';

import store from '@/store/';

import View from '@/webgl/common/View';
import Glasses from './Glasses';
import Video from './Video';

const sceneView = new Scene();
const view = new View();
const video = new Video();
const renderTarget1 = new WebGLRenderTarget();
let glasses;

export default class WebGLContent {
  constructor() {}
  start(viewTexture, glassesGeometry) {
    const { state } = store;

    view.start(renderTarget1.texture, viewTexture);
    glasses = new Glasses(glassesGeometry);
    video.start();
    state.scene.add(view);
    sceneView.add(glasses);
    sceneView.add(video);
  }
  show() {
    view.show();
  }
  async destroy() {
    const { state } = store;

    await view.hide();
    state.scene.remove(view);
    sceneView.remove(glasses);
    sceneView.remove(video);
  }
  async update(time, predictions) {
    const { state } = store;

    if (predictions !== null && predictions.length > 0) {
      glasses.update(predictions[0]);
      glasses.visible = true;
    } else {
      glasses.visible = false;
    }

    view.update(time);

    // Render the post effect.
    state.renderer.setRenderTarget(renderTarget1);
    state.renderer.render(sceneView, state.camera);

    state.renderer.setRenderTarget(null);
  }
  resize() {
    const { resolution } = store.state;

    glasses.resize();
    video.resize();
    renderTarget1.setSize(resolution.x, resolution.y);
  }
}
