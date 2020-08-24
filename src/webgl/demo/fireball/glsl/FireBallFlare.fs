precision highp float;

uniform float time;
uniform sampler2D texture;
uniform float alphaShow;
uniform float alphaHide;

varying vec3 vPosition;
varying vec2 vUv;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb);

void main() {
  float alpha = alphaShow * (1.0 - alphaHide);

  // Define Colors
  float texR = 1.0 - texture2D(texture, vUv + vec2(time * 0.2, 0.0)).g;
  float texG = 1.0 - texture2D(texture, vUv - vec2(time * 0.2, 0.0)).g;
  float strength = smoothstep(0.7, 1.0, sin(radians((texR * 0.5 + texG * 0.5) * 360.0)) * 0.5 + 0.5 - (1.0 - alpha) * 0.3);
  strength = pow(strength, 2.0);
  vec3 hsv = vec3(
    strength * 0.14,
    0.95 - strength * 0.6,
    strength * 0.2 + 0.5
    );
  vec3 rgb = convertHsvToRgb(hsv);
  float opacity = strength * 0.3;

  gl_FragColor = vec4(rgb, opacity);
}
