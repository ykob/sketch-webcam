attribute vec3 position;
attribute float opacity;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 resolution;

varying float vOpacity;

void main() {
  // Coordinate transformation
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(position, 1.0);

  // Define the point size.
  float pointSize = 8.0;

  vOpacity = opacity;

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = pointSize;
}
