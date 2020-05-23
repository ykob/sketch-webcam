precision highp float;

uniform sampler2D texture;

varying vec3 vPosition;
varying vec2 vUv;

void main() {
  vec4 texColor = texture2D(texture, 1.0 - vUv);
  float opacity = texColor.r;

  gl_FragColor = vec4(texColor.gbb, opacity);
}
