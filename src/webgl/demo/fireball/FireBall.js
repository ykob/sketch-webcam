import { Group, Vector2 } from 'three';

// import store from '@/store';

import FireBallCore from './FireBallCore';

export default class FireBall extends Group {
  constructor() {
    super();

    this.p1 = new Vector2();
    this.p2 = new Vector2();
    this.core = new FireBallCore();

    this.add(this.core);
  }
  update({ position }) {
    this.p1.set(position.getX(9), position.getY(9));
    this.p2.set(position.getX(10), position.getY(10));
    const diff = this.p2.clone().lerp(this.p1, 0.5);
    this.position.set(diff.x, diff.y, 0);
  }
}
