import { Metadata } from "next";

export const metadata: Metadata = {
  title: "akaDCI | Chỉnh sửa cổ vật",
};

import ObjectDetail from "@/components/modules/MuseumManagementModule/ObjectDetail";

export default function UserManagementPage() {
  return <ObjectDetail />;
}
