import React from "react";
import { MenuProps } from "antd";
import { HomeFilled, MedicineBoxFilled } from "@ant-design/icons";

export const sidebarMenu: MenuProps["items"] = [
  {
    key: "museum-management",
    icon: React.createElement(HomeFilled),
    label: "Quản lý bảo tàng",
  },
  {
    key: "generation",
    icon: React.createElement(MedicineBoxFilled),
    label: "Phục hồi cổ vật",
  },
];
