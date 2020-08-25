attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec3 cameraPosition;
uniform float time;
uniform sampler2D texture;
uniform float alphaShow;
uniform float alphaHide;

varying vec3 vPosition;
varying vec2 vUv;
varying float vRim;

void main() {
  float alpha = alphaShow * (1.0 - alphaHide);

  // Coordinate transformation
  float texR = 1.0 - texture2D(texture, uv - vec2(time * 0.1, 0.0)).r;
  float texG = 1.0 - texture2D(texture, uv + vec2(time * 0.2, 0.0)).g;
  float strength = sin(radians((texR * 0.7 + texG * 0.3) * 360.0)) * 0.5 + 0.5;
  vec3 updatePosition = position + normalize(position) * strength * 0.4 * (1.0 - alpha);

  vec4 mPosition = modelMatrix * vec4(updatePosition, 1.0);
  float angleToCamera = acos(dot(normalize(cameraPosition), normalize(position)));

  vPosition = mPosition.xyz;
  vUv = uv;
  vRim = smoothstep(0.4, 1.0, abs(sin(angleToCamera)));

  gl_Position = projectionMatrix * viewMatrix * mPosition;
}
