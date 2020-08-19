precision highp float;

uniform float time;
uniform sampler2D texture;

varying vec3 vPosition;
varying vec2 vUv;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb);

void main() {
  // Define Colors
  float texR1 = texture2D(texture, vUv * vec2(0.5, 1.0) + vec2(time * 0.1, 0.0)).r;
  float texR2 = 1.0 - texture2D(texture, vUv * vec2(0.4, 1.0) - vec2(time * 0.1, 0.0)).g;
  float strength = smoothstep(0.5, 1.0, sin(radians((texR1 + texR2) * 360.0)) * 0.5 + 0.5);
  vec3 hsv = vec3(
    strength * 0.14,
    0.95 - strength * 0.6,
    strength * 0.2 + 0.8
    );
  vec3 rgb = convertHsvToRgb(hsv);
  float opacity = strength * 0.3;

  gl_FragColor = vec4(rgb, opacity);
}
