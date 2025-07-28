import { useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, meshBounds } from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const cube = useRef();
  const model = useGLTF("./hamburger.glb");

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const handleLeftClickEvent = (event) => {
    cube.current.material.color.set(
      `#${Math.floor(Math.random() * 16777215).toString(16)}`
    );
  };

  const handleRightClickEvent = (event) => {
    cube.current.material.color.set(`#fff`);
  };

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position-x={-2} onClick={(event) => event.stopPropagation()}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cube}
        raycast={meshBounds}
        position-x={2}
        scale={1.5}
        onClick={handleLeftClickEvent}
        onContextMenu={handleRightClickEvent}
        onPointerEnter={() => (document.body.style.cursor = "pointer")}
        onPointerLeave={() => (document.body.style.cursor = "default")}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <primitive
        object={model.scene}
        scale={0.25}
        position-y={1}
        onClick={(event) => {
          console.log(event.object.name);
          event.stopPropagation();
        }}
      ></primitive>
    </>
  );
}
