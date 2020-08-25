import {
  Points,
  BufferGeometry,
  BufferAttribute,
  RawShaderMaterial,
  AdditiveBlending
} from 'three';
import MathEx from 'js-util/MathEx';

import vs from './glsl/FireBallPoints.vs';
import fs from './glsl/FireBallPoints.fs';

const DURATION = 4;
const NUM = 360;
const DURATION_SHOW = 2;
const DURATION_HIDE = 1;

export default class FireBallPoints extends Points {
  constructor() {
    // Define Geometry
    const geometry = new BufferGeometry();

    // Define attributes of the geometry
    const baPositions = new BufferAttribute(new Float32Array(NUM * 3), 3);
    const baDelays = new BufferAttribute(new Float32Array(NUM), 1);
    const baStartY = new BufferAttribute(new Float32Array(NUM), 1);
    for (var i = 0, ul = NUM; i < ul; i++) {
      const radian = MathEx.radians(Math.random() * 360);
      const radius = Math.random() * 2 + 1;
      baPositions.setXYZ(
        i,
        Math.cos(radian) * radius,
        0,
        Math.sin(radian) * radius
      );
      baDelays.setX(i, Math.random() * DURATION);
      baStartY.setX(i, Math.random() * 1);
    }
    geometry.setAttribute('position', baPositions);
    geometry.setAttribute('delay', baDelays);
    geometry.setAttribute('startY', baStartY);

    // Define Material
    const material = new RawShaderMaterial({
      uniforms: {
        time: {
          value: 0
        },
        duration: {
          value: DURATION
        },
        noiseTex: {
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
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'FireBallPoints';
  }
  start(tex) {
    const { noiseTex } = this.material.uniforms;

    noiseTex.value = tex;
  }
  update(t, ts, th) {
    const { time, alphaShow, alphaHide } = this.material.uniforms;

    time.value += t;
    alphaShow.value = MathEx.clamp(ts / DURATION_SHOW, 0, 1);
    alphaHide.value = MathEx.clamp(th / DURATION_HIDE, 0, 1);
    this.rotation.set(0, time.value * 0.2, 0);
  }
}
