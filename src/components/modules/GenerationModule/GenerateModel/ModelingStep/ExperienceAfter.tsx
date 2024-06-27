import Typography from "@/components/core/common/Typography";
import { BottleFixed } from "@/components/models/BottleFixed";
import { ModelLion } from "@/components/models/Lion";
import { OrbitControls, SpotLight, SpotLightShadow } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Download } from "lucide-react";
import { Suspense } from "react";

function ExperienceAfter() {
  const handleDownload = async () => {
    const link = document.createElement("a");
    link.href = "/models/bottle.glb";
    link.download = "bottle.glb";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-[300px] w-full">
      <Typography.Text
        className="text-center flex items-center justify-center gap-2 w-fit "
        $margin="0 auto 12px auto"
        $fontSize="1.2rem"
        $textTransform="uppercase"
      >
        Sau khi phục hồi
      </Typography.Text>
      <Canvas
        style={{
          width: "100%",
          height: "500px",
          margin: "0 auto",
          // background:
          //   "radial-gradient(circle, rgba(149,149,149,1) 0%, rgba(24,24,24,1) 100%)",
        }}
        camera={{ position: [1, 1, 1] }}
      >
        {/* <axesHelper args={[5]} /> */}
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[0, 10, 0]} intensity={4} />
        <Suspense>
          {/* <ModelLion position={[0, 0, 0]} scale={1.5} /> */}
          <BottleFixed
            position={[0.3, 0, 0]}
            scale={2.7}
            rotation={[0.2, 1.8, 0.5]}
          />
        </Suspense>
      </Canvas>
      <Typography.Text
        className="text-center flex items-center justify-center hover:text-blue-600 cursor-pointer hover:underline gap-2 w-fit"
        $margin="12px auto 0 auto"
        onClick={handleDownload}
      >
        <Download />
        Tải xuống
      </Typography.Text>
    </div>
  );
}

export default ExperienceAfter;
