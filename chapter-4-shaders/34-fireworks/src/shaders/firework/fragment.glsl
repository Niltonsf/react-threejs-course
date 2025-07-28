uniform sampler2D uTexture;
uniform vec3 uColor;
uniform float uProgress;

void main() 
{
  float textureAlpha = texture2D(uTexture, gl_PointCoord).r;
  // textureAlpha *= smoothstep(0.0, 0.5, uProgress);

  // Final color
  gl_FragColor = vec4(uColor, textureAlpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}