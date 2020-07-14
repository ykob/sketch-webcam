import { Group, Vector3 } from 'three';

// import store from '@/store';

import FireBallCore from './FireBallCore';

export default class FireBall extends Group {
  constructor() {
    super();

    this.a1 = 0;
    this.a2 = 0;
    this.p1 = new Vector3();
    this.p2 = new Vector3();
    this.p3 = new Vector3();
    this.p4 = new Vector3();
    this.p5 = new Vector3();
    this.p6 = new Vector3();
    this.core = new FireBallCore();

    this.power = 0;
    this.a = new Vector3();

    this.add(this.core);
  }
  update({ position, opacity }) {
    this.a1 = opacity.getX(9);
    this.a2 = opacity.getX(10);
    this.p1.set(position.getX(7), position.getY(7), 0);
    this.p2.set(position.getX(8), position.getY(8), 0);
    this.p3.set(position.getX(9), position.getY(9), 0);
    this.p4.set(position.getX(10), position.getY(10), 0);
    this.p5.copy(this.p3).add(
      this.p3
        .clone()
        .sub(this.p1)
        .divideScalar(3)
    );
    this.p6.copy(this.p4).add(
      this.p4
        .clone()
        .sub(this.p2)
        .divideScalar(3)
    );
    if (this.a1 * this.a2 > 0) {
      const l = this.p5.clone().lerp(this.p6, 0.5);
      const a = l
        .clone()
        .sub(this.position)
        .multiplyScalar(0.03);
      this.a.add(a);
    }
    this.a.add(this.a.clone().multiplyScalar(-0.08));
    this.position.add(this.a);
  }
}
