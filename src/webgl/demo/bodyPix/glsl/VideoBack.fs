precision highp float;

uniform sampler2D video;

varying vec2 vUv;

void main() {
  vec4 videoColor = texture2D(video, vec2(1.0 - vUv.x, vUv.y));

  gl_FragColor = videoColor;
}
