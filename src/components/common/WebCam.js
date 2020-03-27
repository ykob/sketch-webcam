import { Vector2 } from 'three';
import sleep from 'js-util/sleep';

export default class WebCam {
  constructor() {
    this.video = document.createElement('video');
    this.resolution = new Vector2();
  }
  async init(facingMode = 'user') {
    if (!navigator.mediaDevices) {
      window.alert("navigator.mediaDevices is disabled.");
      return;
    }

    await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: facingMode,
        }
      })
      .then((stream) => {
        this.video.srcObject = stream;
      })
      .catch((error) => {
        window.alert("It wasn't allowed to use WebCam.");
      });

    // get video stream, and set attributes to video object to play auto on iOS.
    this.video.setAttribute('playsinline', true);
    this.video.setAttribute('controls', true);

    // play video.
    this.video.play();

    // get video resolution with promise.
    await sleep(1000);
    this.resolution.x = this.video.width = this.video.videoWidth;
    this.resolution.y = this.video.height = this.video.videoHeight;

    return;
  }
}
