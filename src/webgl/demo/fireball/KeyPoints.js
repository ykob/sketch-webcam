import {
  Points,
  BufferGeometry,
  BufferAttribute,
  RawShaderMaterial
} from 'three';

import vs from './glsl/KeyPoints.vs';
import fs from './glsl/KeyPoints.fs';

export default class KeyPoints extends Points {
  constructor() {
    const geometry = new BufferGeometry();
    const baPositions = new BufferAttribute(new Float32Array(17 * 3), 3);
    const baOpacities = new BufferAttribute(new Float32Array(17), 1);

    geometry.setAttribute('position', baPositions);
    geometry.setAttribute('opacity', baOpacities);

    const material = new RawShaderMaterial({
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true
    });

    super(geometry, material);
  }
}
