import React, { useRef } from "react";
import { useFrame, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CustomObject from "./CustomObject";

extend({ OrbitControls });

export default function App() {
  const boxRef = useRef();
  const groupRef = useRef();
  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    boxRef.current.rotation.y += delta;
    // groupRef.current.rotation.y += delta;
    // const angle = state.clock.elapsedTime;

    // camera.position.x = Math.sin(angle) * 15;
    // camera.position.z = Math.cos(angle) * 15;

    // camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight position={[1, 2, 3]} />

      <ambientLight intensity={0.5} />

      <CustomObject />

      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh
          ref={boxRef}
          scale={1.5}
          position-x={2}
          rotation-y={Math.PI * 0.25}
        >
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>
      <mesh scale={10} position-y={-1} rotation-x={Math.PI * -0.5}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
