import {
  LineSegments,
  BufferGeometry,
  BufferAttribute,
  RawShaderMaterial
} from 'three';

import vs from './glsl/KeyPointsLine.vs';
import fs from './glsl/KeyPointsLine.fs';

export default class KeyPointsLine extends LineSegments {
  constructor() {
    const geometry = new BufferGeometry();
    const baPositions = new BufferAttribute(new Float32Array(24 * 3), 3);
    const baOpacities = new BufferAttribute(new Float32Array(24), 1);

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
