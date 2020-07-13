import { Group, Vector3 } from 'three';

// import store from '@/store';

import FireBallCore from './FireBallCore';

export default class FireBall extends Group {
  constructor() {
    super();

    this.p1 = new Vector3();
    this.p2 = new Vector3();
    this.core = new FireBallCore();

    this.add(this.core);
  }
  update({ position }) {
    this.p1.set(position.getX(9), position.getY(9), 0);
    this.p2.set(position.getX(10), position.getY(10), 0);
    const l = this.p2.clone().lerp(this.p1, 0.5);
    const a = l
      .clone()
      .sub(this.position)
      .divideScalar(10);
    this.position.add(a);
  }
}
