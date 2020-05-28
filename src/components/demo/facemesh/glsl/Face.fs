precision highp float;

uniform float time;
uniform sampler2D texture;

varying vec2 vUv;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb);

void main() {
  vec4 texColor1 = texture2D(texture, 1.0 - vUv);
  vec4 texColor2 = texture2D(texture, 1.0 - vUv + vec2(0.0, time * 0.2));
  vec4 texColor3 = texture2D(texture, 1.0 - vUv - vec2(0.5, time * 0.1));

  float alpha1 = smoothstep(0.05, 0.25, texColor1.r * texColor2.g * texColor3.g);
  float alpha2 = texColor2.g * texColor3.g;
  vec3 color = convertHsvToRgb(
    vec3(
      alpha2 * 0.8 + time * 0.1,
      sin(alpha2 * 6.0) * 0.1 + 0.8,
      sin(alpha1 * 8.0) * 0.8
    )
  );

  gl_FragColor = vec4(color, 1.0);
}
