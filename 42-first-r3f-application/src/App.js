import React from "react";

export default function App() {
  return (
    <>
      <mesh scale={[3, 2, 1]} position={[1, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="red" wireframe={true} />
      </mesh>
    </>
  );
}
