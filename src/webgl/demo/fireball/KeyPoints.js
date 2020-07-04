import {
  Vector2,
  Points,
  BufferGeometry,
  PointsMaterial,
  BufferAttribute
} from 'three';
import MathEx from 'js-util/MathEx';

import store from '@/store';

export default class KeyPoints extends Points {
  constructor() {
    const geometry = new BufferGeometry();
    const baPositions = new BufferAttribute(new Float32Array(17 * 3), 3);

    geometry.setAttribute('position', baPositions);

    const material = new PointsMaterial({
      color: 0xff3300,
      size: 2
    });

    super(geometry, material);
    this.size = new Vector2();
    this.imgRatio = new Vector2();
  }
  update(keyPoints) {
    const { resolution } = store.state.webcam;
    for (let index = 0; index < 17; index++) {
      const v = new Vector2(
        keyPoints[index].position.x,
        keyPoints[index].position.y
      );
      v.x = v.x - resolution.x * 0.5;
      v.y = v.y - resolution.y * 0.5;

      const x = ((v.x / resolution.x) * this.size.x) / this.imgRatio.x;
      const y = ((v.y / -resolution.y) * this.size.y) / this.imgRatio.y;
      this.geometry.attributes.position.setXYZ(index, x, y, 0);
    }
    this.geometry.attributes.position.needsUpdate = true;
  }
  resize() {
    const { camera } = store.state;

    const height = Math.abs(
      (camera.position.z - this.position.z) *
        Math.tan(MathEx.radians(camera.fov) / 2) *
        2
    );
    const width = height * camera.aspect;

    this.size.set(width, height, 1);

    const { resolution } = store.state.webcam;
    this.imgRatio.set(
      Math.min(1, ((this.size.x / this.size.y) * resolution.y) / resolution.x),
      Math.min(1, ((this.size.y / this.size.x) * resolution.x) / resolution.y)
    );
  }
}
