precision highp float;

uniform float time;
uniform sampler2D texture;
uniform float alphaShow;
uniform float alphaHide;

varying vec3 vPosition;
varying vec2 vUv;
varying float vRim;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb);

void main() {
  float alpha = alphaShow * (1.0 - alphaHide);

  // Define Colors
  float texR1 = texture2D(texture, vUv - vec2(time * 0.05, 0.0)).r;
  float texR2 = 1.0 - texture2D(texture, vUv + vec2(time * 0.14, 0.0)).g;
  float strength = sin(radians((texR1 + texR2) * 360.0)) * 0.5 + 0.5;
  vec3 hsv1 = vec3(
    strength * 0.14 + 0.03 + (1.0 - alpha) * 0.08,
    0.95 - strength * 0.8,
    strength * 0.2 + 0.5 - (1.0 - alpha) * 0.2
    );
  vec3 rgb = convertHsvToRgb(hsv1);

  vec3 hsv2 = vec3(0.17, 0.15, 0.7);
  vec3 rimColor = convertHsvToRgb(hsv2);
  
  vec3 color = rgb * (1.0 - vRim) + rimColor * vRim;
  float opacity = min(1.0, (alpha * 2.0 - strength) / 0.4);

  gl_FragColor = vec4(color, opacity);
}
