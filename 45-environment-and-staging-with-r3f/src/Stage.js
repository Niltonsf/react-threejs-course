import { useFrame } from "@react-three/fiber";
import { OrbitControls, useHelper, Stage } from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";

// softShadows({
//   frustum: 3.75,
//   size: 0.005,
//   near: 9.5,
//   samples: 17,
//   rings: 11,
// });

export default function StageComponent() {
  const cube = useRef();
  const directionalLight = useRef();

  const { envMapIntersity, envMapHeight, envMapRadius, envMapScale } =
    useControls("enironmentMap", {
      envMapIntersity: { value: 3.5, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 12 },
      envMapRadius: { value: 28, min: 0, max: 100 },
      envMapScale: { value: 100, min: 0, max: 1000 },
    });

  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  useFrame((state, delta) => {
    // cube.current.position.x = 2 + Math.sin(state.clock.elapsedTime);
    cube.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Stage
        contactShadow={{ opacity: 0.2, blur: 3 }}
        environment="sunset"
        preset="portrait"
        intensity={2}
      >
        <mesh position-x={-2} position-y={1} castShadow>
          <sphereGeometry />
          <meshStandardMaterial
            color="orange"
            envMapIntensity={envMapIntersity}
          />
        </mesh>

        <mesh ref={cube} position-x={2} position-y={1} scale={1.5} castShadow>
          <boxGeometry />
          <meshStandardMaterial
            color="mediumpurple"
            envMapIntensity={envMapIntersity}
          />
        </mesh>
      </Stage>
    </>
  );
}
