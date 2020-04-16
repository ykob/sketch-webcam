precision highp float;

uniform sampler2D video;

varying vec2 vUv;

void main() {
  vec4 videoColor = texture2D(video, vUv);

  gl_FragColor = videoColor;
}
