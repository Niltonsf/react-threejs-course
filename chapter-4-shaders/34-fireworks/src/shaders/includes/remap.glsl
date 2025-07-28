float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax) 
{
  return destinationMin + (destinationMax - destinationMin) * (value - originMin) / (originMax - originMin);
}