import { Vector2, Group } from 'three';
import MathEx from 'js-util/MathEx';

import store from '@/store';

import KeyPoints from './KeyPoints';
import KeyPointsLine from './KeyPointsLine';

const LINE_INDICES = [
  [5, 6],
  [5, 7],
  [5, 11],
  [6, 8],
  [6, 12],
  [7, 9],
  [8, 10],
  [11, 12],
  [11, 13],
  [12, 14],
  [13, 15],
  [14, 16]
];

export default class KeyPointsGroup extends Group {
  constructor() {
    super();

    this.points = new KeyPoints();
    this.line = new KeyPointsLine();
    this.size = new Vector2();
    this.imgRatio = new Vector2();

    this.add(this.points);
    this.add(this.line);
  }
  update(keyPoints) {
    const { resolution } = store.state.webcam;

    // update the points geometry.
    for (let index = 0; index < 17; index++) {
      const v = new Vector2(
        keyPoints[index].position.x,
        keyPoints[index].position.y
      );
      v.x = v.x - resolution.x * 0.5;
      v.y = v.y - resolution.y * 0.5;

      const x = ((v.x / -resolution.x) * this.size.x) / this.imgRatio.x;
      const y = ((v.y / -resolution.y) * this.size.y) / this.imgRatio.y;
      this.points.geometry.attributes.position.setXYZ(index, x, y, 0);

      const a = keyPoints[index].score > 0.5 ? 1 : 0;
      this.points.geometry.attributes.opacity.setX(index, a);
    }
    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.opacity.needsUpdate = true;

    // update the line geometry.
    for (let index = 0; index < LINE_INDICES.length; index++) {
      const i1 = LINE_INDICES[index][0];
      const i2 = LINE_INDICES[index][1];
      const x1 = this.points.geometry.attributes.position.getX(i1);
      const y1 = this.points.geometry.attributes.position.getY(i1);
      const x2 = this.points.geometry.attributes.position.getX(i2);
      const y2 = this.points.geometry.attributes.position.getY(i2);

      this.line.geometry.attributes.position.setXYZ(index * 2, x1, y1, 0);
      this.line.geometry.attributes.position.setXYZ(index * 2 + 1, x2, y2, 0);
    }
    this.line.geometry.attributes.position.needsUpdate = true;
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

    this.points.material.uniforms.pixelRatio.value = store.state.pixelRatio;
    this.line.material.uniforms.pixelRatio.value = store.state.pixelRatio;
  }
}
