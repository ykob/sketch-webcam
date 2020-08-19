import { Mesh, IcosahedronBufferGeometry, RawShaderMaterial } from 'three';

// import store from '@/store';

import vs from './glsl/FireBallCore.vs';
import fs from './glsl/FireBallCore.fs';

export default class FireBallCore extends Mesh {
  constructor() {
    const geometry = new IcosahedronBufferGeometry(2, 2);

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
      transparent: true
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
