import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useHelper,
  BakeShadows,
  softShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Stars,
  Cloud,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls, button } from "leva";

// softShadows({
//   frustum: 3.75,
//   size: 0.005,
//   near: 9.5,
//   samples: 17,
//   rings: 11,
// });

export default function Experience() {
  const cube = useRef();
  const directionalLight = useRef();
  const { color, opacity, blur } = useControls("shadows", {
    color: "#00ff00",
    opacity: 1,
    blur: { value: 1, min: 0, max: 10 },
  });
  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, -0.9, 3] },
  });
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
      {/* <BakeShadows /> */}

      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows> */}

      <ContactShadows
        position={[0, 0, 0]}
        resolution={128 * 2}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        frames={1}
      />

      <Environment
        // background
        // files={[
        //   "./environmentMaps/2/px.jpg",
        //   "./environmentMaps/2/nx.jpg",
        //   "./environmentMaps/2/py.jpg",
        //   "./environmentMaps/2/ny.jpg",
        //   "./environmentMaps/2/pz.jpg",
        //   "./environmentMaps/2/nz.jpg",
        // ]}
        // files="./environmentMaps/the_sky_is_on_fire_2k.hdr"
        preset="sunset"
        resolution={32}
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
      >
        <color args={["black"]} attach="background" />
        {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[20, 0, 0]} />
        </mesh> */}
        <Lightformer
          position-z={-10}
          scale={10}
          color="red"
          intensity={10}
          form="ring"
        />
      </Environment>

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* LIGHTS */}
      {/* <directionalLight
        ref={directionalLight}
        position={sunPosition}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      /> */}

      {/* <ambientLight intensity={0.5} /> */}

      {/* SKY */}
      {/* <Sky sunPosition={sunPosition} />

      <Cloud
        opacity={0.3}
        position-y={20}
        speed={0.2} // Rotation speed
        width={20} // Width of the full cloud
        depth={1} // Z-dir depth
        segments={40} // Number of particles
      /> */}

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

      {/* <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={10} receiveShadow>
        <planeGeometry />
        <meshStandardMaterial
          color="greenyellow"
          envMapIntensity={envMapIntersity}
        />
      </mesh> */}
    </>
  );
}
