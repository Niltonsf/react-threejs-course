import MainWebpage from "./main.js";
import {
  OrbitControls,
  Environment,
  useGLTF,
  Float,
  PresentationControls,
  ContactShadows,
  Html,
  Text,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function Experience() {
  const model = useGLTF("./model.gltf");
  const screen = useRef();

  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(screen.current.position);
  }, []);

  return (
    <>
      <color args={["#B2BEB5"]} attach="background" />

      <Environment preset="city" />

      {/* <OrbitControls /> */}

      <primitive object={model.scene} position-y={-1.2}>
        <Html
          transform
          zIndexRange={[0, 0]}
          style={{
            width: 1000,
            height: 400,
            overflow: "auto",
          }}
          scale={0.9}
          distanceFactor={1.17}
          position={[0, 1.56, -1.4]}
          rotation-x={-0.256}
        >
          <MainWebpage />
        </Html>
      </primitive>

      <mesh ref={screen} position={[0, 0.5, -2]}>
        <planeGeometry args={[1, 1, 1]} />
      </mesh>

      <ContactShadows position-y={-1.4} opacity={0.5} scale={5} blur={2.4} />
    </>
  );
}
