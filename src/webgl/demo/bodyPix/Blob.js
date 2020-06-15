import { Mesh, RawShaderMaterial } from 'three';

import vs from './glsl/Blob.vs';
import fs from './glsl/Blob.fs';

export default class Blob extends Mesh {
  constructor(geometry) {
    // Define Material
    const material = new RawShaderMaterial({
      uniforms: {
        time: {
          value: 0
        }
      },
      vertexShader: vs,
      fragmentShader: fs,
      flatShading: true
    });
    super(geometry, material);
    this.random1 = Math.random();
    this.random2 = Math.random();
  }
  update(t) {
    const { time } = this.material.uniforms;
    time.value += t;
    this.position.set(
      Math.cos(time.value * 1.5 + this.random1 * 20) * 12,
      Math.sin(time.value / 2 + this.random1 * 1000) * 5,
      Math.sin(time.value * 1.5 + this.random1 * 20) * 12
    );
    this.rotation.set(
      time.value * 2 + this.random2 * 20,
      time.value * 2 + this.random2 * 20,
      time.value * 2 + this.random2 * 20
    );
  }
}
