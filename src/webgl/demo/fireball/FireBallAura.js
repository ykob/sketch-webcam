import { Mesh, PlaneBufferGeometry, RawShaderMaterial } from 'three';

// import store from '@/store';

import vs from './glsl/FireBallAura.vs';
import fs from './glsl/FireBallAura.fs';

export default class FireBallAura extends Mesh {
  constructor() {
    const geometry = new PlaneBufferGeometry(4.8, 4.8, 1, 1);

    const material = new RawShaderMaterial({
      uniforms: {
        time: {
          value: 0
        }
      },
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true
    });

    super(geometry, material);
  }
  update(t) {
    const { time } = this.material.uniforms;

    time.value += t;
  }
}
