import { Group, Vector3 } from 'three';

// import store from '@/store';

import FireBallAura from './FireBallAura';
import FireBallCore from './FireBallCore';
import FireBallFlare from './FireBallFlare';
import FireBallPoints from './FireBallPoints';

export default class FireBall extends Group {
  constructor() {
    super();

    this.a1 = 0;
    this.a2 = 0;
    this.p5 = new Vector3();
    this.p6 = new Vector3();
    this.p7 = new Vector3();
    this.p8 = new Vector3();
    this.p9 = new Vector3();
    this.p9a = new Vector3();
    this.p10 = new Vector3();
    this.p10a = new Vector3();
    this.p11 = new Vector3();
    this.p12 = new Vector3();
    this.aura = new FireBallAura();
    this.core = new FireBallCore();
    this.flare = new FireBallFlare();
    this.points = new FireBallPoints();

    this.power = 0;
    this.a = new Vector3();
    this.sa = 0;

    this.add(this.aura);
    this.add(this.core);
    this.add(this.flare);
    this.add(this.points);
  }
  start(texCore, texNoise) {
    this.core.start(texCore);
    this.flare.start(texCore);
    this.points.start(texNoise);
    this.points.show();
  }
  update(time, { position, opacity }) {
    this.a1 = opacity.getX(9);
    this.a2 = opacity.getX(10);
    this.p5.set(position.getX(5), position.getY(5), 0);
    this.p6.set(position.getX(6), position.getY(6), 0);
    this.p7.set(position.getX(7), position.getY(7), 0);
    this.p8.set(position.getX(8), position.getY(8), 0);
    this.p9.set(position.getX(9), position.getY(9), 0);
    this.p10.set(position.getX(10), position.getY(10), 0);
    this.p11.set(position.getX(11), position.getY(11), 0);
    this.p12.set(position.getX(12), position.getY(12), 0);

    this.p9a.copy(this.p9).add(
      this.p9
        .clone()
        .sub(this.p7)
        .divideScalar(3)
    );
    this.p10a.copy(this.p10).add(
      this.p10
        .clone()
        .sub(this.p8)
        .divideScalar(3)
    );

    // basis distance.
    const d1 =
      ((this.p5.distanceTo(this.p11) + this.p6.distanceTo(this.p12)) / 2) * 0.1;
    const d2 = this.p9a.distanceTo(this.p10a) * 0.1;

    // calculate position, acceleration and power.
    if (this.a1 * this.a2 > 0 && d2 / d1 < 1) {
      const l = this.p9a.clone().lerp(this.p10a, 0.5);
      const a = l
        .clone()
        .sub(this.position)
        .multiplyScalar(0.03);

      if (this.power === 0) {
        this.a.set(0, 0, 0);
        this.position.copy(l);
      }
      this.a.add(a);
      this.power = Math.min(100, this.power + 1);
    } else {
      this.power = Math.max(0, this.power - 5);
    }
    this.a.add(this.a.clone().multiplyScalar(-0.08));
    this.position.add(this.a);

    // calculate scale.
    this.sa += (d1 - this.sa) * 0.1;
    this.scale.set(this.sa, this.sa, this.sa);

    // update the children.
    this.aura.update(time);
    this.core.update(time);
    this.flare.update(time);
    this.points.update(time);
  }
  resize() {
    this.points.resize();
  }
}
