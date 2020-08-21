import { Mesh, PlaneBufferGeometry, RawShaderMaterial, Vector2 } from 'three';
import MathEx from 'js-util/MathEx';

import vs from '@/webgl/common/glsl/PostEffect.vs';
import fs from './glsl/PostEffectGodray.fs';

import store from '@/store/';

export default class PostEffectGodray extends Mesh {
  constructor() {
    // Define Geometry
    const geometry = new PlaneBufferGeometry(2, 2);

    // Define Material
    const material = new RawShaderMaterial({
      uniforms: {
        godrayCenter: {
          value: new Vector2(0.5, 0.5)
        },
        texture1: {
          value: null
        },
        texture2: {
          value: null
        }
      },
      vertexShader: vs,
      fragmentShader: fs
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'PostEffectGodray';
  }
  start(tex1, tex2) {
    const { texture1, texture2 } = this.material.uniforms;

    texture1.value = tex1;
    texture2.value = tex2;
  }
  update(fireballPosition) {
    const { state } = store;
    const { godrayCenter } = this.material.uniforms;
    const height = Math.abs(
      (state.camera.position.z - fireballPosition.z) *
        Math.tan(MathEx.radians(state.camera.fov) / 2) *
        2
    );
    const width = height * state.camera.aspect;

    godrayCenter.value.set(
      fireballPosition.x / width + 0.5,
      fireballPosition.y / height + 0.5
    );
  }
}
