import { OBJLoader } from 'three/examples/js/loaders/OBJLoader';

const objLoader = new OBJLoader();

export default function(src) {
  return new Promise((resolve, reject) => {
    objLoader.load(src, resolve, null, reject);
  });
}
