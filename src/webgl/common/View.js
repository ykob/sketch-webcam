import { Mesh, PlaneBufferGeometry, RawShaderMaterial } from 'three';
import sleep from 'js-util/sleep';

import store from '@/store';

import vs from './glsl/View.vs';
import fs from './glsl/View.fs';

export default class View extends Mesh {
  constructor() {
    // Define Geometry
    const geometry = new PlaneBufferGeometry(2, 2);

    // Define Material
    const material = new RawShaderMaterial({
      uniforms: {
        timeShow: {
          value: 0
        },
        timeHide: {
          value: 0
        },
        resolution: {
          value: store.state.resolution
        },
        texture1: {
          value: null
        },
        texture2: {
          value: null
        }
      },
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'View';

    this.isShown = false;
    this.isHidden = false;
  }
  start(texture1, texture2) {
    this.material.uniforms.texture1.value = texture1;
    this.material.uniforms.texture2.value = texture2;
  }
  show() {
    if (this.isShown === true) return;

    const { timeShow, timeHide } = this.material.uniforms;

    timeShow.value = 0;
    timeHide.value = 0;
    this.isShown = true;
    this.isHidden = false;
  }
  async hide() {
    const { timeShow, timeHide } = this.material.uniforms;

    if (this.isShown === false) return;
    timeHide.value = 0;
    this.isHidden = true;
    await sleep(1500);
    this.isShown = false;
    this.isHidden = false;
    timeShow.value = 0;
    timeHide.value = 0;
    return;
  }
  update(time) {
    const { timeShow, timeHide } = this.material.uniforms;

    if (this.isShown === true) {
      timeShow.value += time;
    }
    if (this.isHidden === true) {
      timeHide.value += time;
    }
  }
}
