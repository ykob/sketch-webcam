import { Mesh, PlaneBufferGeometry, RawShaderMaterial } from 'three';

import vs from '@/webgl/common/glsl/PostEffect.vs';
import fs from './glsl/PostEffectTotal.fs';

export default class PostEffectTotal extends Mesh {
  constructor() {
    // Define Geometry
    const geometry = new PlaneBufferGeometry(2, 2);

    // Define Material
    const material = new RawShaderMaterial({
      uniforms: {
        texture1: {
          value: null
        },
        texture2: {
          value: null
        }
      },
      vertexShader: vs,
      fragmentShader: fs
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'PostEffectTotal';
  }
  start(tex1, tex2) {
    const { texture1, texture2 } = this.material.uniforms;

    texture1.value = tex1;
    texture2.value = tex2;
  }
}
