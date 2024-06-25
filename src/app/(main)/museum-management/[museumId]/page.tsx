import { Metadata } from "next";

export const metadata: Metadata = {
  title: "akaDCI | Chỉnh sửa bảo tàng",
};

import MuseumDetail from "@/components/modules/MuseumManagementModule/MuseumDetail";

export default function UserManagementPage() {
  return <MuseumDetail />;
}
