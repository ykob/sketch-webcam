precision highp float;

uniform float time;

varying vec2 vUv;

#pragma glslify: ease = require(glsl-easings/circular-out);
#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb);

void main() {
  vec2 p = 2.0 * vUv - 1.0;

  // Define Colors
  vec3 hsv = vec3(0.17, 0.15, 1.0);
  vec3 rgb = convertHsvToRgb(hsv);
  float opacity = 1.0 - ease(smoothstep(0.65, 1.0, length(p)));

  gl_FragColor = vec4(rgb, opacity);
}
