import { Bottle } from "@/components/models/Bottle";
import { ModelLion } from "@/components/models/Lion";
import { OrbitControls, SpotLight, SpotLightShadow } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

function Experience() {
  return (
    <div className="min-h-[300px]">
      <Canvas
        style={{
          width: "100%",
          height: "500px",
          margin: "0 auto",
          background:
            "radial-gradient(circle, rgba(149,149,149,1) 0%, rgba(24,24,24,1) 100%)",
        }}
        camera={{ position: [1, 1, 1] }}
      >
        {/* <axesHelper args={[5]} /> */}
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[0, 10, 0]} intensity={4} />
        <Suspense>
          {/* <ModelLion position={[0, 0, 0]} scale={1.5} /> */}
          <Bottle position={[0, 0, 0]} scale={3} rotation={[0.1, -1.2, -0.2]} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Experience;
