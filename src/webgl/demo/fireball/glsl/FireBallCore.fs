precision highp float;

uniform float time;
uniform sampler2D texture;

varying vec3 vPosition;
varying vec2 vUv;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb);

void main() {
  vec3 light = normalize(vec3(0.0, 1.0, 1.0));
  vec3 normal = normalize(cross(dFdx(vPosition), dFdy(vPosition)));
  float diff = dot(normal, light);

  // Define Colors
  float texR1 = texture2D(texture, vUv + vec2(time * 0.1, 0.0)).r;
  float texR2 = texture2D(texture, 1.0 - vUv + vec2(time * 0.2, 0.0)).r;
  float strength1 = smoothstep(0.3, 1.5, texR1 + texR2);
  float strength2 = smoothstep(0.2, 1.6, texR1 + texR2);
  vec3 hsv = vec3(strength2 * 0.14 - 0.02, 0.7 + strength1 * 0.2, 0.4 + strength1 * 0.55);
  vec3 rgb = convertHsvToRgb(hsv);

  gl_FragColor = vec4(rgb, 1.0);
}
