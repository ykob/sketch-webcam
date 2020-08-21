precision highp float;

uniform sampler2D texture1;
uniform sampler2D texture2;

varying vec2 vUv;

void main() {
  // get the texture colors.
  vec4 texColor1 = texture2D(texture1, vUv);
  vec4 texColor2 = texture2D(texture2, vUv);

  gl_FragColor = texColor1 * 0.4 + texColor2 * 0.6;
}
