import React from "react";
import { MenuProps } from "antd";
import {
  HomeFilled,
  MedicineBoxFilled,
  PieChartFilled,
} from "@ant-design/icons";

export const sidebarMenu: MenuProps["items"] = [
  {
    key: "statistics",
    icon: React.createElement(PieChartFilled),
    label: "Thống kê",
  },
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
