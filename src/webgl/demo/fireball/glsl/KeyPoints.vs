attribute vec3 position;
attribute float opacity;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float pixelRatio;

varying float vOpacity;

void main() {
  // Coordinate transformation
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(position, 1.0);
  float distanceFromCamera = length(mvPosition.xyz);

  // Define the point size.
  float pointSize = 12.0 * pixelRatio;

  vOpacity = opacity;

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = pointSize;
}
