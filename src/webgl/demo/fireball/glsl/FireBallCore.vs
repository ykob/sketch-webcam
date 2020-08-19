attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec3 cameraPosition;

varying vec3 vPosition;
varying vec2 vUv;
varying float vRim;

void main() {
  // Coordinate transformation
  vec4 mPosition = modelMatrix * vec4(position, 1.0);
  float angleToCamera = acos(dot(normalize(cameraPosition), normalize(position)));

  vPosition = mPosition.xyz;
  vUv = uv;
  vRim = smoothstep(0.4, 1.0, abs(sin(angleToCamera)));

  gl_Position = projectionMatrix * viewMatrix * mPosition;
}
