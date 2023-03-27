import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.js";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Canvas
    eventSource={document.getElementById("root")}
    camera={{
      fov: 45,
      near: 0.1,
      far: 2000,
      position: [0, 2.5, 2],
    }}
  >
    <Experience />
  </Canvas>
);
