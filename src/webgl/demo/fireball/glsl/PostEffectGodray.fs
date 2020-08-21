precision highp float;

uniform vec2 godrayCenter;
uniform sampler2D texture1;

varying vec2 vUv;

const float godrayIteration = 60.0;
const float godrayStrength = 40.0;

void main() {
  // get the texture colors.
  vec4 texColor1 = texture2D(texture1, vUv);

  // godray
  vec3 godrayDestColor = vec3(0.0);
  float godrayTotalWeight = 0.0;

  for (float i = 0.0; i < 60.0; i++) {
    float alpha = i / godrayIteration; // step in loop [0, 1].
    float weight = alpha - alpha * alpha; // conic curve [0, 0.25, 0].
    vec2 shiftUv = vUv - (vUv - godrayCenter) * alpha * godrayStrength / godrayIteration; // define a range of to shift UV.
    godrayDestColor += texture2D(texture1, shiftUv).rgb * weight; // draw gradation.
    godrayTotalWeight += weight;
  }
  vec3 godray = godrayDestColor / godrayTotalWeight;

  gl_FragColor = vec4(godray, 1.0);
}
