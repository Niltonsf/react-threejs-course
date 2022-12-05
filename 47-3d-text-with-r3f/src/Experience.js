import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  //   const [torusGeometry, setTorusGeometry] = useState();
  //   const [material, setMaterial] = useState();
  const donutGroup = useRef();
  const [matCapTexture] = useMatcapTexture("36220C_C6C391_8C844A_8B7B4C", 256);

  useEffect(() => {
    matCapTexture.encoding = THREE.sRGBEncoding;
    matCapTexture.needsUpdate = true;

    material.matcap = matCapTexture;
    material.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    for (const donut of donutGroup.current.children) {
      donut.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
      <meshMatcapMaterial ref={setMaterial} matcap={mapCapTexture} /> */}

      <Center>
        <Text3D
          material={material}
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          HELLO R3F
        </Text3D>
      </Center>

      <group ref={donutGroup}>
        {[...Array(100)].map((v, i) => {
          return (
            <mesh
              key={i.toString()}
              scale={0.2 + Math.random() * 0.2}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
              position={[
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
              ]}
              geometry={torusGeometry}
              material={material}
            ></mesh>
          );
        })}
      </group>
    </>
  );
}
