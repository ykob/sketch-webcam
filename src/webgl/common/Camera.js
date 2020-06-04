import { PerspectiveCamera } from 'three';

import store from '@/store';

export default class Camera extends PerspectiveCamera {
  constructor(fov, aspect, near, far) {
    super(fov, aspect, near, far);

    this.time = 0;
    this.isActive = false;
  }
  start() {
    this.setFocalLength(50);
    this.far = 1000;
    this.position.set(0, 0, 50);
    this.lookAt(0, 0, 0);
    this.isActive = true;
  }
  update(time) {
    if (this.isActive === false) return;
    this.time += time;
  }
  resize() {
    const { resolution } = store.state;

    this.aspect = resolution.x / resolution.y;
    this.updateProjectionMatrix();
  }
}
