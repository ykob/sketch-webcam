import { Mesh, PlaneBufferGeometry, RawShaderMaterial, Vector2 } from 'three';

import store from '@/store';

import vs from './glsl/PostEffect.vs';
import fs from './glsl/PostEffectBlur.fs';

export default class PostEffectBlur extends Mesh {
  constructor() {
    // Define Geometry
    const geometry = new PlaneBufferGeometry(2, 2);

    // Define Material
    const material = new RawShaderMaterial({
      uniforms: {
        resolution: {
          value: new Vector2()
        },
        direction: {
          value: new Vector2()
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
    this.name = 'PostEffectBlur';
  }
  start(texture, x, y) {
    this.material.uniforms.texture.value = texture;
    this.material.uniforms.direction.value.set(x, y);
  }
  resize() {
    const { resolution } = store.state;
    this.material.uniforms.resolution.value.set(
      resolution.x / 3,
      resolution.y / 3
    );
  }
}
