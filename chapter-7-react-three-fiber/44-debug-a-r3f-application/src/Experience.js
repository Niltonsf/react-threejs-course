import { OrbitControls } from "@react-three/drei";
import { useControls, button } from "leva";
import { Perf } from "r3f-perf";

export default function Experience() {
  const { perfVisible } = useControls({
    perfVisible: false,
  });
  const { position, color, visible } = useControls("sphere", {
    position: {
      value: { x: -2, y: 0 },
      min: -10,
      max: 10,
      joystick: "invertY",
      step: 0.01,
    },
    color: "orange",
    visible: true,
    clickMe: button(() => {
      console.log("yes");
    }),
    choice: { options: ["a", "b", "c"] },
  });

  return (
    <>
      {perfVisible && <Perf position="top-left" />}

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position={[position.x, position.y, 0]} visible={visible}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
