precision highp float;

uniform float time;
uniform float alphaShow;
uniform float alphaHide;

varying vec2 vUv;

#pragma glslify: ease = require(glsl-easings/circular-out);
#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb);

void main() {
  vec2 p = 2.0 * vUv - 1.0;
  float alpha = alphaShow * (1.0 - alphaHide);

  // Define Colors
  vec3 hsv = vec3(0.17, 0.15, 0.7);
  vec3 rgb = convertHsvToRgb(hsv);
  float opacity = (1.0 - ease(smoothstep(0.65, 1.0, length(p)))) * (alpha / 0.5);

  gl_FragColor = vec4(rgb, opacity);
}
