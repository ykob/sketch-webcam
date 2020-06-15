import { Mesh, RawShaderMaterial, Vector2, Vector3, Matrix4 } from 'three';
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
    this.scale.set(0, 0, 0);
  }
  update(prediction) {
    const { mesh, scaledMesh } = prediction;
    const { resolution } = store.state.webcam;

    const p0 = new Vector3();
    p0.fromArray(scaledMesh[5]);
    p0.x = p0.x - resolution.x * 0.5;
    p0.y = p0.y - resolution.y * 0.5;

    const p1 = new Vector3();
    const p2 = new Vector3();
    const p3 = new Vector3();

    p1.fromArray(mesh[5]);
    p2.fromArray(mesh[44]);
    p3.fromArray(mesh[274]);

    const x = p3
      .clone()
      .sub(p2)
      .normalize();
    const y = p1
      .clone()
      .sub(p2)
      .normalize();
    const z = new Vector3().crossVectors(x, y);
    const y2 = new Vector3().crossVectors(x, z).normalize();
    const z2 = new Vector3().crossVectors(x, y2).normalize();
    const rotateMat = new Matrix4().makeBasis(x, y2, z2);
    this.rotation.setFromRotationMatrix(rotateMat);

    const normal = p0.clone().normalize();
    const x3 = ((p0.x / -resolution.x) * this.size.x) / this.imgRatio.x;
    const y3 = (((p0.y + 10) / -resolution.y) * this.size.y) / this.imgRatio.y;
    const z3 = normal.z * (x3 / normal.x) - 3;
    this.position.set(x3, y3, z3);

    const p4 = new Vector3().fromArray(scaledMesh[10]);
    const p5 = new Vector3().fromArray(scaledMesh[152]);

    const scale = p4.distanceTo(p5) / 1800;
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
