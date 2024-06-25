import { Metadata } from "next";

export const metadata: Metadata = {
  title: "akaDCI | Quản lý bảo tàng",
};

import UsersManagementModule from "@/components/modules/UsersManagement";

export default function UserManagementPage() {
  return <UsersManagementModule />;
}
