import { Mesh, RawShaderMaterial, Vector2, Vector3 } from 'three';
import MathEx from 'js-util/MathEx';

import store from '@/store';

import vs from './glsl/Glasses.vs';
import fs from './glsl/Glasses.fs';

export default class Glasses extends Mesh {
  constructor(geometry) {
    // Define Material
    const material = new RawShaderMaterial({
      vertexShader: vs,
      fragmentShader: fs,
      flatShading: true
    });

    super(geometry, material);
    this.size = new Vector2();
    this.imgRatio = new Vector2();
  }
  update(prediction) {
    const { scaledMesh } = prediction;
    const { resolution } = store.state.webcam;

    const v = new Vector3();
    v.fromArray(scaledMesh[19]);
    v.x = v.x - resolution.x * 0.5;
    v.y = v.y - resolution.y * 0.5;

    const normal = v.clone().normalize();
    const x = ((v.x / -resolution.x) * this.size.x) / this.imgRatio.x;
    const y = ((v.y / -resolution.y) * this.size.y) / this.imgRatio.y;
    const z = normal.z * (x / normal.x);
    this.position.set(x, y, z);

    const scale = 0.2;
    this.scale.set(scale, scale, scale);
  }
  resize() {
    const { camera } = store.state;

    const height = Math.abs(
      (camera.position.z - this.position.z) *
        Math.tan(MathEx.radians(camera.fov) / 2) *
        2
    );
    const width = height * camera.aspect;

    this.size.set(width, height, 1);

    const { resolution } = store.state.webcam;
    this.imgRatio.set(
      Math.min(1, ((this.size.x / this.size.y) * resolution.y) / resolution.x),
      Math.min(1, ((this.size.y / this.size.x) * resolution.x) / resolution.y)
    );
  }
}
