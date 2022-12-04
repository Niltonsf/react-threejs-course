import React from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";

export default function Fox(props) {
  const fox = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(fox.animations, fox.scene);
  const { choice } = useControls("Fox", {
    choice: { options: animations.names },
  });

  React.useEffect(() => {
    const action = animations.actions[choice];
    action.reset().fadeIn(0.5).play();

    // setTimeout(() => {
    //   animations.actions.Walk.play();
    //   animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1);
    // }, 2000);
    return () => {
      action.fadeOut(0.5);
    };
  }, [choice]);

  return <primitive object={fox.scene} {...props} />;
}
