import { Mesh, IcosahedronBufferGeometry, RawShaderMaterial } from 'three';

// import store from '@/store';

import vs from './glsl/FireBallCore.vs';
import fs from './glsl/FireBallCore.fs';

export default class FireBallCore extends Mesh {
  constructor() {
    const geometry = new IcosahedronBufferGeometry(1, 2);

    const material = new RawShaderMaterial({
      vertexShader: vs,
      fragmentShader: fs,
      flatShading: true,
      transparent: true
    });

    super(geometry, material);

    this.rotateTime = 0;
  }
  update(time, power) {
    const scale = power * 0.02;
    this.scale.set(scale, scale, scale);

    this.rotateTime += time;
    this.rotation.set(this.rotateTime, this.rotateTime, this.rotateTime);
  }
}
