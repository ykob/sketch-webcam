attribute vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

void main() {
  // Coordinate transformation
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * mvPosition;
}
