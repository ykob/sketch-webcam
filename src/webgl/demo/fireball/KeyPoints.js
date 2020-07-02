import { Points, BufferGeometry, PointsMaterial, BufferAttribute } from 'three';

export default class KeyPoints extends Points {
  constructor() {
    const geometry = new BufferGeometry();
    const baPositions = new BufferAttribute(new Float32Array(17 * 3), 3);

    geometry.setAttribute('position', baPositions);

    const material = new PointsMaterial({
      color: 0xff3300,
      size: 4
    });

    super(geometry, material);
  }
}
