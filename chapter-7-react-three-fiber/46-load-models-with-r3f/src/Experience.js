import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Model from "./Model";
import Hamburger from "./Hamburger";
import Fox from "./Fox";
import Placeholder from "./Placeholder";
import { Suspense } from "react";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={0.5} />
      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <Suspense fallback={<Placeholder />}>
        {/* <Model /> */}
        {/* <Hamburger scale={0.35} /> */}
        <Fox scale={0.03} position={[-2.5, -1, 2.5]} rotation-y={0.3} />
      </Suspense>
    </>
  );
}
