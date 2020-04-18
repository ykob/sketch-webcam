precision highp float;

uniform sampler2D video;
uniform sampler2D segmentation;

varying vec2 vUv;

void main() {
  vec4 videoColor = texture2D(video, vec2(1.0 - vUv.x, vUv.y));
  vec4 segmentationColor = texture2D(segmentation, 1.0 - vUv);

  gl_FragColor = vec4(videoColor.rgb, segmentationColor.r);
}
