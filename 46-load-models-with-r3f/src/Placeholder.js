import React from "react";

export default function Placeholder() {
  return (
    <mesh scale={[2, 3, 2]} position-y={0.5}>
      <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
      <meshBasicMaterial wireframe color="red" />
    </mesh>
  );
}
