import {
  Mesh,
  BufferGeometry,
  BufferAttribute,
  RawShaderMaterial,
  Vector2,
  BackSide,
  AdditiveBlending,
  Vector3
} from 'three';
import MathEx from 'js-util/MathEx';

import store from '@/store';

import { TRIANGULATION } from '@/const/FACEMESH';

import vs from './glsl/Face.vs';
import fs from './glsl/Face.fs';

export default class Face extends Mesh {
  constructor() {
    // Define Geometry
    const geometry = new BufferGeometry();
    const baPositions = new BufferAttribute(new Float32Array(468 * 3), 3);
    const baIndices = new BufferAttribute(TRIANGULATION, 1);
    geometry.setAttribute('position', baPositions);
    geometry.setIndex(baIndices);

    // Define Material
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
      side: BackSide,
      transparent: true,
      blending: AdditiveBlending
    });

    super(geometry, material);
    this.size = new Vector2();
    this.imgRatio = new Vector2();
  }
  update(time, prediction) {
    const { scaledMesh } = prediction;
    const { resolution } = store.state.webcam;

    this.material.uniforms.time.value += time;

    for (var i = 0, ul = scaledMesh.length; i < ul; i++) {
      const v = new Vector3();
      v.fromArray(scaledMesh[i]);
      v.x = v.x - resolution.x * 0.5;
      v.y = v.y - resolution.y * 0.5;

      const normal = v.clone().normalize();
      const x = ((v.x / -resolution.x) * this.size.x) / this.imgRatio.x;
      const y = ((v.y / -resolution.y) * this.size.y) / this.imgRatio.y;
      const z = normal.z * (x / normal.x);
      this.geometry.attributes.position.setXYZ(i, x, y, z);
    }
    this.geometry.attributes.position.needsUpdate = true;
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
  setUv(arr) {
    const uvs = arr.reduce((pre, current) => {
      pre.push(...current);
      return pre;
    }, []);
    const baUvs = new BufferAttribute(new Float32Array(uvs), 2);
    this.geometry.setAttribute('uv', baUvs);
  }
  setTexture(texture) {
    this.material.uniforms.texture.value = texture;
  }
}
