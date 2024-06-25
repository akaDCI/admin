import { Metadata } from "next";

export const metadata: Metadata = {
  title: "akaDCI | Quản lý người dùng",
};

import MuseumManagementModule from "@/components/modules/MuseumManagementModule/ViewAllMuseum";

export default function UserManagementPage() {
  return <MuseumManagementModule />;
}
