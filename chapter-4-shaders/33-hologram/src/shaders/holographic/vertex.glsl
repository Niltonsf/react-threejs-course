varying vec3 vPosition;
varying vec3 vNormal;
uniform float uTime;
#include ../includes/random2D.glsl;

void main() 
{
  // Position
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Glitch
  float glitchTime = uTime - modelPosition.y;
  float glitchSrength = sin(glitchTime) + sin(glitchTime * 3.45) + sin(glitchTime * 8.76);
  glitchSrength /= 3.0;
  glitchSrength *= smoothstep(0.3, 1.0, glitchSrength);
  glitchSrength *= 0.25;
  modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchSrength;
  modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * glitchSrength;

  // Final position
  gl_Position = projectionMatrix * viewMatrix * modelPosition;

  // Model normal
  vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

  // Varying
  vPosition = modelPosition.xyz;
  // vPosition = position.xyz;
  vNormal = modelNormal.xyz;
}