precision highp float;

varying float vOpacity;

void main() {
  // Define Colors
  vec3 color = vec3(1.0, 0.3, 0.2);

  gl_FragColor = vec4(color, vOpacity);
}
