import { Mesh, IcosahedronBufferGeometry, RawShaderMaterial } from 'three';

// import store from '@/store';

import vs from './glsl/FireBallCore.vs';
import fs from './glsl/FireBallCore.fs';

export default class FireBallCore extends Mesh {
  constructor() {
    const geometry = new IcosahedronBufferGeometry(1, 2);

    const material = new RawShaderMaterial({
      uniforms: {
        time: {
          value: 0
        },
        texture: {
          value: null
        }
      },
      vertexShader: vs,
      fragmentShader: fs,
      flatShading: true,
      transparent: true
    });

    super(geometry, material);
  }
  start(tex) {
    const { texture } = this.material.uniforms;

    texture.value = tex;
  }
  update(t, power) {
    const { time } = this.material.uniforms;
    const scale = power * 0.02;

    this.scale.set(scale, scale, scale);
    time.value += t;
  }
}
