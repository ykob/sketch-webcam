import { Mesh, PlaneBufferGeometry, RawShaderMaterial } from 'three';

import vs from './glsl/PostEffect.vs';
import fs from './glsl/PostEffectBright.fs';

export default class PostEffectBright extends Mesh {
  constructor() {
    // Define Geometry
    const geometry = new PlaneBufferGeometry(2, 2);

    // Define Material
    const material = new RawShaderMaterial({
      uniforms: {
        minBright: {
          value: 0.25
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
    this.name = 'PostEffectBright';
  }
  start(texture) {
    this.material.uniforms.texture.value = texture;
  }
}
