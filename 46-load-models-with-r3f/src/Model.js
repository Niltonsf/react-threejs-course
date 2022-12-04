import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useGLTF, Clone } from "@react-three/drei";

export default function Model() {
  // WITHOUT DREI
  // Normal loader
  // const model = useLoader(GLTFLoader, "./hamburger.glb", (loader) => {
  //   console.log(loader);
  // });

  // Draco loader
  // const model = useLoader(GLTFLoader, "./hamburger-draco.glb", (loader) => {
  //   const dracoLoader = new DRACOLoader();
  //   dracoLoader.setDecoderPath("./draco/");
  //   loader.setDRACOLoader(dracoLoader);
  // });
  // const model = useLoader(
  //   GLTFLoader,
  //   "./FlightHelmet/glTF/FlightHelmet.gltf",
  //   (loader) => {
  //     const dracoLoader = new DRACOLoader();
  //     dracoLoader.setDecoderPath("./draco/");
  //     loader.setDRACOLoader(dracoLoader);
  //   }
  // );

  // WITH DREI
  const model = useGLTF("./hamburger-draco.glb");

  return (
    <>
      <Clone object={model.scene} scale={0.35} />
      <Clone object={model.scene} scale={0.35} position-x={-4} />
    </>
  );
}

useGLTF.preload("/hamburger-draco.glb");
