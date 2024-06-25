import { Metadata } from "next";

import GenerateModel from "@/components/modules/GenerationModule/GenerateModel/Main";

export const metadata: Metadata = {
  title: "akaDCI | Sinh Model 3D",
};

export default function GenerationPage() {
  return <GenerateModel />;
}
