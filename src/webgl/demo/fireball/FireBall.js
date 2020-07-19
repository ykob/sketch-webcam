import { Group, Vector3 } from 'three';

// import store from '@/store';

import FireBallCore from './FireBallCore';

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
    this.core = new FireBallCore();

    this.power = 0;
    this.a = new Vector3();
    this.sa = 0;

    this.add(this.core);
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

    // calculate position and acceleration.
    if (this.a1 * this.a2 > 0) {
      const l = this.p9a.clone().lerp(this.p10a, 0.5);
      const a = l
        .clone()
        .sub(this.position)
        .multiplyScalar(0.03);
      this.a.add(a);
    }
    this.a.add(this.a.clone().multiplyScalar(-0.08));
    this.position.add(this.a);

    // calculate scale.
    this.sa += (d1 - this.sa) * 0.1;
    this.scale.set(this.sa, this.sa, this.sa);

    // calculate power.
    if (d2 / d1 < 1) {
      this.power = Math.min(100, this.power + 1);
    } else {
      this.power = Math.max(0, this.power - 5);
    }

    // update the children.
    this.core.update(time, this.power);
  }
}
