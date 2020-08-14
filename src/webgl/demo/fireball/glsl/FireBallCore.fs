precision highp float;

uniform float time;
uniform sampler2D texture;

varying vec3 vPosition;
varying vec2 vUv;

#pragma glslify: ease = require(glsl-easings/circular-in-out);
#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb);

void main() {
  vec3 light = normalize(vec3(0.0, 1.0, 1.0));
  vec3 normal = normalize(cross(dFdx(vPosition), dFdy(vPosition)));
  float diff = dot(normal, light);

  // Define Colors
  float texR1 = texture2D(texture, vUv - vec2(time * 0.05, 0.0)).r;
  float texR2 = texture2D(texture, vUv + vec2(time * 0.14, 0.0)).g;
  float strength1 = (texR1 + texR2) / 2.0;
  float strength2 = ease(smoothstep(0.1, 1.8, texR1 + texR2));
  vec3 hsv = vec3(strength1 * 0.12 + 0.01, 0.95 - strength2 * 0.3, 0.6 + strength2 * 0.4);
  vec3 rgb = convertHsvToRgb(hsv);

  gl_FragColor = vec4(rgb, 1.0);
}
