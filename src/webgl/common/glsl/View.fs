precision highp float;

uniform float time;
uniform sampler2D texture;

varying vec2 vUv;

void main() {
  vec2 p = vUv * 2.0 - 1.0;

  vec4 color = texture2D(texture, vUv);

  gl_FragColor = color;
}
