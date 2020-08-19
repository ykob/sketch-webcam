attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec3 cameraPosition;
uniform float time;
uniform sampler2D texture;

varying vec3 vPosition;
varying vec2 vUv;

void main() {
  // Coordinate transformation
  float texR1 = texture2D(texture, uv + vec2(time * 0.2, 0.0)).r;
  float texR2 = 1.0 - texture2D(texture, uv - vec2(time * 0.2, 0.0)).g;
  float strength = sin(radians((texR1 + texR2) * 360.0)) * 0.5 + 0.5;
  vec3 updatePosition = position + normalize(position) * strength * 1.5;

  vec4 mPosition = modelMatrix * vec4(updatePosition, 1.0);

  vPosition = mPosition.xyz;
  vUv = uv;

  gl_Position = projectionMatrix * viewMatrix * mPosition;
}
