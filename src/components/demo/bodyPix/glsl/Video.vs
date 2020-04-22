attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 imgRatio;

varying vec2 vUv;

void main() {
  vec2 updateUv = uv * imgRatio + (1.0 - imgRatio) * 0.5;

  // coordinate transformation
  vec4 mPosition = modelMatrix * vec4(position, 1.0);

  vUv = updateUv;

  gl_Position = projectionMatrix * viewMatrix * mPosition;
}
