import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function BottleFixed(props: any) {
  const { nodes }: any = useGLTF("/models/bottle_fixed.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
      />
    </group>
  );
}
