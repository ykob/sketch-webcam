precision highp float;

uniform float timeShow;
uniform float timeHide;
uniform vec2 resolution;
uniform sampler2D texture1;
uniform sampler2D texture2;

varying vec2 vUv;

void main() {
  vec2 ratio = vec2(
    min(resolution.x / resolution.y, 1.0),
    min(resolution.y / resolution.x, 1.0)
  );
  vec2 updateUv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  vec3 color = texture2D(texture1, vUv).rgb;
  vec2 fadeColor = texture2D(texture2, updateUv).rg;
  float opacity1 = (timeShow - (fadeColor.r + fadeColor.g) * 0.5) / 0.15;
  float opacity2 = 1.0 - (timeHide - (fadeColor.r + fadeColor.g) * 0.5) / 0.15;

  gl_FragColor = vec4(color, opacity1 * opacity2);
}
