precision highp float;

varying vec3 vPosition;

void main() {
  vec3 light = normalize(vec3(0.0, 1.0, 1.0));
  vec3 normal = normalize(cross(dFdx(vPosition), dFdy(vPosition)));
  float diff = dot(normal, light);

  // Define Colors
  vec3 color = vec3(1.0, 0.3, 0.2);

  gl_FragColor = vec4(color + diff * 0.5, 1.0);
}
