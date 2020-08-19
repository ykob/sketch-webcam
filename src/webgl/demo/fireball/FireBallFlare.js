import {
  Mesh,
  IcosahedronBufferGeometry,
  RawShaderMaterial,
  DoubleSide
} from 'three';

// import store from '@/store';

import vs from './glsl/FireBallFlare.vs';
import fs from './glsl/FireBallFlare.fs';

export default class FireBallFlare extends Mesh {
  constructor() {
    const geometry = new IcosahedronBufferGeometry(2.2, 2);

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
      transparent: true,
      side: DoubleSide
    });

    super(geometry, material);
  }
  start(tex) {
    const { texture } = this.material.uniforms;

    texture.value = tex;
  }
  update(t) {
    const { time } = this.material.uniforms;

    time.value += t;
  }
}
