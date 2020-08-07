import { Mesh, PlaneBufferGeometry, RawShaderMaterial } from 'three';

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
        time: {
          value: 0
        },
        resolution: {
          value: store.state.resolution
        },
        texture: {
          value: null
        }
      },
      vertexShader: vs,
      fragmentShader: fs
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'View';
  }
  start(texture) {
    this.material.uniforms.texture.value = texture;
  }
}
