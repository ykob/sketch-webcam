precision highp float;

uniform sampler2D segmentation;

varying vec2 vUv;

void main() {
  vec4 segmentationColor = texture2D(segmentation, 1.0 - vUv);

  gl_FragColor = vec4(segmentationColor.rgb * 255.0, 1.0);
}
