import { Points, BufferGeometry, BufferAttribute, RawShaderMaterial } from 'three';
import MathEx from 'js-util/MathEx';

import store from '@/store';
import vs from '@/webgl/glsl/FireBallPoints.vs';
import fs from '@/webgl/glsl/FireBallPoints.fs';

const DURATION = 4;
const NUM = 360;
const DURATION_SHOW = 2;
const DELAY_SHOW = 4;
const DURATION_HIDE = 1;
const DELAY_HIDE = 0;

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
      const radius = Math.random() * 5 + 1;
      baPositions.setXYZ(
        i,
        Math.cos(radian) * radius,
        0,
        Math.sin(radian) * radius
      );
      baDelays.setX(i, Math.random() * DURATION);
      baStartY.setX(i, Math.random() * 4);
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
        resolution: {
          value: new Vector2()
        },
        pixelRatio: {
          value: 1
        },
        noiseTex: {
          value: null
        },
        alpha: {
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
    this.name = 'SkullPoints';
    this.timeShow = 0;
    this.timeHide = 0;
    this.isShown = false;
    this.isHidden = false;
  }
  start(tex) {
    const { noiseTex } = this.material.uniforms;

    noiseTex.value = tex;
  }
  show() {
    if (this.timeShow > 0) this.timeShow = DELAY_SHOW / 2;
    this.timeHide = 0;
    this.isShown = true;
    this.isHidden = false;
  }
  hide() {
    this.isHidden = true;
  }
  update(t) {
    const { time, alpha } = this.material.uniforms;

    time.value += t;
    this.rotation.set(0, time.value * 0.2, 0);

    // for the showing effect.
    if (this.isShown === true) {
      this.timeShow += t;
      if (this.timeShow - DELAY_SHOW >= DURATION_SHOW) {
        this.isShown = false;
      }
    }
    // for the hiding effect.
    if (this.isHidden === true) {
      this.timeHide += t;
      if (this.timeHide - DELAY_HIDE >= DURATION_HIDE) {
        this.isHidden = false;
      }
    }

    // calculation the alpha.
    const alphaShow = MathEx.clamp(
      (this.timeShow - DELAY_SHOW) / DURATION_SHOW,
      0.0,
      1.0
    );
    const alphaHide = MathEx.clamp(
      (this.timeHide - DELAY_HIDE) / DURATION_HIDE,
      0.0,
      1.0
    );
    alpha.value = alphaShow * (1.0 - alphaHide);
  }
  resize() {
    const { resolution } = this.material.uniforms;

    resolution.value.copy(store.state.resolution);
  }
}
