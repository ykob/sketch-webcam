precision highp float;

uniform sampler2D video;
uniform sampler2D texture;

varying vec2 vUv;

void main() {
  vec4 videoColor = texture2D(video, vec2(1.0 - vUv.x, vUv.y));
  vec4 segmentColor = texture2D(texture, vUv);

  gl_FragColor = videoColor * segmentColor;
}
