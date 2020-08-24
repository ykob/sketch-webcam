import { Mesh, IcosahedronBufferGeometry, RawShaderMaterial } from 'three';
import MathEx from 'js-util/MathEx';

// import store from '@/store';

import vs from './glsl/FireBallCore.vs';
import fs from './glsl/FireBallCore.fs';

const DURATION_SHOW = 2;
const DURATION_HIDE = 1;

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
        },
        alphaShow: {
          value: 0
        },
        alphaHide: {
          value: 0
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
  update(t, ts, th) {
    const { time, alphaShow, alphaHide } = this.material.uniforms;

    time.value += t;
    alphaShow.value = MathEx.clamp(ts / DURATION_SHOW, 0, 1);
    alphaHide.value = MathEx.clamp(th / DURATION_HIDE, 0, 1);
  }
}
