"use client";

import { Col, Row } from "antd";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { useMemo } from "react";
import { useStaticsHourlyDistributionQuery } from "@/store/queries/statics";
import moment from "moment";
import { useSearchParams } from "next/navigation";

moment.locale("vi");

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

const DUMMY_DATA = {
  path_storage: [
    {
      user_name: "phuonglinh",
      object_name: "mũ thời Nguyễn",
      age: 15,
      message: "Giá trị lịch sử của cổ vật này là gì?",
      timestamp: "2024-07-26T15:20:00",
    },
    {
      user_name: "tinld",
      object_name: "bình gốm thời Nguyễn",
      age: 18,
      message: "Cổ vật này được tìm thấy ở đâu?",
      timestamp: "2024-07-26T15:21:00",
    },
    {
      user_name: "tinld",
      object_name: "tượng Phật thời Nguyễn",
      age: 17,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T14:23:00",
    },
    {
      user_name: "bichngoc",
      object_name: "chén uống trà thời Nguyễn",
      age: 26,
      message: "Cổ vật này được tìm thấy ở đâu?",
      timestamp: "2024-07-26T07:20:00",
    },
    {
      user_name: "bichngoc",
      object_name: "sách cổ thời Nguyễn",
      age: 25,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T19:31:00",
    },
    {
      user_name: "phuonglinh",
      object_name: "tượng Phật thời Nguyễn",
      age: 25,
      message: "Giá trị lịch sử của cổ vật này là gì?",
      timestamp: "2024-07-26T15:15:00",
    },
    {
      user_name: "tinld",
      object_name: "tượng Phật thời Nguyễn",
      age: 21,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T08:48:00",
    },
    {
      user_name: "anhtuan",
      object_name: "sách cổ thời Nguyễn",
      age: 19,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T10:21:00",
    },
    {
      user_name: "anhtuan",
      object_name: "kiếm thời Nguyễn",
      age: 13,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T11:48:00",
    },
    {
      user_name: "anhtuan",
      object_name: "sách cổ thời Nguyễn",
      age: 15,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T12:33:00",
    },
    {
      user_name: "anhtuan",
      object_name: "kiếm thời Nguyễn",
      age: 18,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T14:38:00",
    },
    {
      user_name: "tinld",
      object_name: "đĩa sứ thời Nguyễn",
      age: 23,
      message: "Cổ vật này được tìm thấy ở đâu?",
      timestamp: "2024-07-26T09:20:00",
    },
    {
      user_name: "tinld",
      object_name: "tượng Phật thời Nguyễn",
      age: 26,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T16:25:00",
    },
    {
      user_name: "hoangnam",
      object_name: "mũ thời Nguyễn",
      age: 11,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T12:33:00",
    },
    {
      user_name: "phuonglinh",
      object_name: "trống thời Nguyễn",
      age: 13,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T15:54:00",
    },
    {
      user_name: "bichngoc",
      object_name: "trống thời Nguyễn",
      age: 20,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T09:36:00",
    },
    {
      user_name: "hoangnam",
      object_name: "bình gốm thời Nguyễn",
      age: 11,
      message: "Cổ vật này được tìm thấy ở đâu?",
      timestamp: "2024-07-26T15:00:00",
    },
    {
      user_name: "phuonglinh",
      object_name: "kiếm thời Nguyễn",
      age: 22,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T13:39:00",
    },
    {
      user_name: "anhtuan",
      object_name: "tranh thêu thời Nguyễn",
      age: 28,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T09:24:00",
    },
    {
      user_name: "hoangnam",
      object_name: "đĩa sứ thời Nguyễn",
      age: 27,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T11:28:00",
    },
    {
      user_name: "hoangnam",
      object_name: "mũ thời Nguyễn",
      age: 12,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T15:38:00",
    },
    {
      user_name: "tinld",
      object_name: "chén uống trà thời Nguyễn",
      age: 16,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T13:26:00",
    },
    {
      user_name: "bichngoc",
      object_name: "áo giáp thời Nguyễn",
      age: 10,
      message: "Giá trị lịch sử của cổ vật này là gì?",
      timestamp: "2024-07-26T11:35:00",
    },
    {
      user_name: "hoangnam",
      object_name: "tượng Phật thời Nguyễn",
      age: 26,
      message: "Giá trị lịch sử của cổ vật này là gì?",
      timestamp: "2024-07-26T07:08:00",
    },
    {
      user_name: "bichngoc",
      object_name: "kiếm thời Nguyễn",
      age: 30,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T10:45:00",
    },
    {
      user_name: "hoangnam",
      object_name: "sách cổ thời Nguyễn",
      age: 30,
      message: "Giá trị lịch sử của cổ vật này là gì?",
      timestamp: "2024-07-26T09:22:00",
    },
    {
      user_name: "anhtuan",
      object_name: "kiếm thời Nguyễn",
      age: 25,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T16:28:00",
    },
    {
      user_name: "phuonglinh",
      object_name: "mũ thời Nguyễn",
      age: 13,
      message: "Giá trị lịch sử của cổ vật này là gì?",
      timestamp: "2024-07-26T06:24:00",
    },
    {
      user_name: "tinld",
      object_name: "áo giáp thời Nguyễn",
      age: 22,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T09:21:00",
    },
    {
      user_name: "bichngoc",
      object_name: "áo giáp thời Nguyễn",
      age: 26,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T14:27:00",
    },
    {
      user_name: "phuonglinh",
      object_name: "áo giáp thời Nguyễn",
      age: 14,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T06:35:00",
    },
    {
      user_name: "hoangnam",
      object_name: "tượng Phật thời Nguyễn",
      age: 30,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T06:27:00",
    },
    {
      user_name: "hoangnam",
      object_name: "mũ thời Nguyễn",
      age: 25,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T10:31:00",
    },
    {
      user_name: "tinld",
      object_name: "chén uống trà thời Nguyễn",
      age: 10,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T09:27:00",
    },
    {
      user_name: "bichngoc",
      object_name: "chén uống trà thời Nguyễn",
      age: 22,
      message: "Cổ vật này được tìm thấy ở đâu?",
      timestamp: "2024-07-26T09:37:00",
    },
    {
      user_name: "phuonglinh",
      object_name: "trống thời Nguyễn",
      age: 28,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T05:13:00",
    },
    {
      user_name: "phuonglinh",
      object_name: "áo giáp thời Nguyễn",
      age: 18,
      message: "Giá trị lịch sử của cổ vật này là gì?",
      timestamp: "2024-07-26T15:47:00",
    },
    {
      user_name: "bichngoc",
      object_name: "kiếm thời Nguyễn",
      age: 18,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T11:38:00",
    },
    {
      user_name: "anhtuan",
      object_name: "chén uống trà thời Nguyễn",
      age: 16,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T13:27:00",
    },
    {
      user_name: "phuonglinh",
      object_name: "đĩa sứ thời Nguyễn",
      age: 29,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T10:32:00",
    },
    {
      user_name: "anhtuan",
      object_name: "kiếm thời Nguyễn",
      age: 12,
      message: "Cổ vật này được tìm thấy ở đâu?",
      timestamp: "2024-07-26T13:39:00",
    },
    {
      user_name: "tinld",
      object_name: "áo giáp thời Nguyễn",
      age: 20,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T12:27:00",
    },
    {
      user_name: "anhtuan",
      object_name: "áo giáp thời Nguyễn",
      age: 20,
      message: "Cổ vật này được tìm thấy ở đâu?",
      timestamp: "2024-07-26T12:37:00",
    },
    {
      user_name: "phuonglinh",
      object_name: "áo giáp thời Nguyễn",
      age: 28,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T10:56:00",
    },
    {
      user_name: "phuonglinh",
      object_name: "bình gốm thời Nguyễn",
      age: 21,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T15:45:00",
    },
    {
      user_name: "hoangnam",
      object_name: "mũ thời Nguyễn",
      age: 15,
      message: "Cổ vật này được tìm thấy ở đâu?",
      timestamp: "2024-07-26T13:16:00",
    },
    {
      user_name: "bichngoc",
      object_name: "áo giáp thời Nguyễn",
      age: 13,
      message: "Cổ vật này được tìm thấy ở đâu?",
      timestamp: "2024-07-26T15:41:00",
    },
    {
      user_name: "bichngoc",
      object_name: "áo giáp thời Nguyễn",
      age: 30,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T08:36:00",
    },
    {
      user_name: "anhtuan",
      object_name: "chén uống trà thời Nguyễn",
      age: 24,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T08:07:00",
    },
    {
      user_name: "bichngoc",
      object_name: "đĩa sứ thời Nguyễn",
      age: 16,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T19:38:00",
    },
    {
      user_name: "phuonglinh",
      object_name: "mũ thời Nguyễn",
      age: 10,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T11:22:00",
    },
    {
      user_name: "hoangnam",
      object_name: "kiếm thời Nguyễn",
      age: 10,
      message: "Giá trị lịch sử của cổ vật này là gì?",
      timestamp: "2024-07-26T09:39:00",
    },
    {
      user_name: "hoangnam",
      object_name: "kiếm thời Nguyễn",
      age: 29,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T07:21:00",
    },
    {
      user_name: "bichngoc",
      object_name: "tranh thêu thời Nguyễn",
      age: 24,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T10:26:00",
    },
    {
      user_name: "bichngoc",
      object_name: "chén uống trà thời Nguyễn",
      age: 13,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T10:11:00",
    },
    {
      user_name: "tinld",
      object_name: "chén uống trà thời Nguyễn",
      age: 12,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T13:45:00",
    },
    {
      user_name: "bichngoc",
      object_name: "bình gốm thời Nguyễn",
      age: 17,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T11:42:00",
    },
    {
      user_name: "anhtuan",
      object_name: "mũ thời Nguyễn",
      age: 10,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T19:31:00",
    },
    {
      user_name: "bichngoc",
      object_name: "kiếm thời Nguyễn",
      age: 11,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T12:19:00",
    },
    {
      user_name: "hoangnam",
      object_name: "chén uống trà thời Nguyễn",
      age: 22,
      message: "Cổ vật này được tìm thấy ở đâu?",
      timestamp: "2024-07-26T10:28:00",
    },
    {
      user_name: "phuonglinh",
      object_name: "mũ thời Nguyễn",
      age: 23,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T12:24:00",
    },
    {
      user_name: "hoangnam",
      object_name: "sách cổ thời Nguyễn",
      age: 24,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T08:00:00",
    },
    {
      user_name: "anhtuan",
      object_name: "mũ thời Nguyễn",
      age: 28,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T15:27:00",
    },
    {
      user_name: "tinld",
      object_name: "đĩa sứ thời Nguyễn",
      age: 24,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T12:19:00",
    },
    {
      user_name: "anhtuan",
      object_name: "áo giáp thời Nguyễn",
      age: 28,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T11:16:00",
    },
    {
      user_name: "bichngoc",
      object_name: "sách cổ thời Nguyễn",
      age: 23,
      message: "Giá trị lịch sử của cổ vật này là gì?",
      timestamp: "2024-07-26T12:19:00",
    },
    {
      user_name: "bichngoc",
      object_name: "đĩa sứ thời Nguyễn",
      age: 11,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T11:25:00",
    },
    {
      user_name: "anhtuan",
      object_name: "đĩa sứ thời Nguyễn",
      age: 10,
      message: "Cổ vật này được tìm thấy ở đâu?",
      timestamp: "2024-07-26T10:41:00",
    },
    {
      user_name: "phuonglinh",
      object_name: "trống thời Nguyễn",
      age: 17,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T11:37:00",
    },
    {
      user_name: "phuonglinh",
      object_name: "áo giáp thời Nguyễn",
      age: 25,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T12:00:00",
    },
    {
      user_name: "bichngoc",
      object_name: "mũ thời Nguyễn",
      age: 20,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T09:41:00",
    },
    {
      user_name: "tinld",
      object_name: "mũ thời Nguyễn",
      age: 29,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T16:26:00",
    },
    {
      user_name: "tinld",
      object_name: "bình gốm thời Nguyễn",
      age: 27,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T12:31:00",
    },
    {
      user_name: "anhtuan",
      object_name: "tượng Phật thời Nguyễn",
      age: 30,
      message: "Cổ vật này được tìm thấy ở đâu?",
      timestamp: "2024-07-26T19:00:00",
    },
    {
      user_name: "tinld",
      object_name: "đĩa sứ thời Nguyễn",
      age: 15,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T14:31:00",
    },
    {
      user_name: "tinld",
      object_name: "áo giáp thời Nguyễn",
      age: 16,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T12:15:00",
    },
    {
      user_name: "hoangnam",
      object_name: "tranh thêu thời Nguyễn",
      age: 10,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T12:10:00",
    },
    {
      user_name: "anhtuan",
      object_name: "tượng Phật thời Nguyễn",
      age: 15,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T12:38:00",
    },
    {
      user_name: "phuonglinh",
      object_name: "chén uống trà thời Nguyễn",
      age: 29,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T17:47:00",
    },
    {
      user_name: "phuonglinh",
      object_name: "kiếm thời Nguyễn",
      age: 29,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T15:25:00",
    },
    {
      user_name: "hoangnam",
      object_name: "chén uống trà thời Nguyễn",
      age: 27,
      message: "Giá trị lịch sử của cổ vật này là gì?",
      timestamp: "2024-07-26T14:09:00",
    },
    {
      user_name: "tinld",
      object_name: "bình gốm thời Nguyễn",
      age: 29,
      message: "Cổ vật này được tìm thấy ở đâu?",
      timestamp: "2024-07-26T14:16:00",
    },
    {
      user_name: "bichngoc",
      object_name: "tượng Phật thời Nguyễn",
      age: 15,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T09:37:00",
    },
    {
      user_name: "hoangnam",
      object_name: "sách cổ thời Nguyễn",
      age: 27,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T11:51:00",
    },
    {
      user_name: "phuonglinh",
      object_name: "mũ thời Nguyễn",
      age: 25,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T11:31:00",
    },
    {
      user_name: "tinld",
      object_name: "trống thời Nguyễn",
      age: 23,
      message: "Cổ vật này được tìm thấy ở đâu?",
      timestamp: "2024-07-26T06:25:00",
    },
    {
      user_name: "anhtuan",
      object_name: "đĩa sứ thời Nguyễn",
      age: 28,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T11:15:00",
    },
    {
      user_name: "anhtuan",
      object_name: "áo giáp thời Nguyễn",
      age: 29,
      message: "Cổ vật này được tìm thấy ở đâu?",
      timestamp: "2024-07-26T10:58:00",
    },
    {
      user_name: "tinld",
      object_name: "chén uống trà thời Nguyễn",
      age: 29,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T13:36:00",
    },
    {
      user_name: "phuonglinh",
      object_name: "kiếm thời Nguyễn",
      age: 28,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T08:42:00",
    },
    {
      user_name: "hoangnam",
      object_name: "mũ thời Nguyễn",
      age: 18,
      message: "Cổ vật này được tìm thấy ở đâu?",
      timestamp: "2024-07-26T05:50:00",
    },
    {
      user_name: "anhtuan",
      object_name: "áo giáp thời Nguyễn",
      age: 25,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T13:46:00",
    },
    {
      user_name: "tinld",
      object_name: "tranh thêu thời Nguyễn",
      age: 28,
      message: "Giá trị lịch sử của cổ vật này là gì?",
      timestamp: "2024-07-26T07:52:00",
    },
    {
      user_name: "anhtuan",
      object_name: "áo giáp thời Nguyễn",
      age: 25,
      message: "Cổ vật này có từ thời kỳ nào?",
      timestamp: "2024-07-26T11:29:00",
    },
    {
      user_name: "hoangnam",
      object_name: "đĩa sứ thời Nguyễn",
      age: 18,
      message: "Cổ vật này được tìm thấy ở đâu?",
      timestamp: "2024-07-26T12:16:00",
    },
    {
      user_name: "bichngoc",
      object_name: "bình gốm thời Nguyễn",
      age: 12,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T16:44:00",
    },
    {
      user_name: "bichngoc",
      object_name: "tượng Phật thời Nguyễn",
      age: 11,
      message: "Vật liệu làm ra cổ vật này là gì?",
      timestamp: "2024-07-26T12:23:00",
    },
    {
      user_name: "tinld",
      object_name: "sách cổ thời Nguyễn",
      age: 16,
      message: "Giá trị lịch sử của cổ vật này là gì?",
      timestamp: "2024-07-26T10:31:00",
    },
    {
      user_name: "hoangnam",
      object_name: "áo giáp thời Nguyễn",
      age: 21,
      message: "Kích thước của cổ vật này như thế nào?",
      timestamp: "2024-07-26T16:27:00",
    },
    {
      user_name: "tinld",
      object_name: "sách cổ thời Nguyễn",
      age: 21,
      message: "Giá trị lịch sử của cổ vật này là gì?",
      timestamp: "2024-07-26T12:26:00",
    },
  ],
  bot_answer:
    "```html<!DOCTYPE html><html><head>    <title>Báo cáo phân phối theo giờ</title>    <style>        table {            width: 70%;            border-collapse: collapse;        }        th, td {            border: 1px solid black;            text-align: center;            padding: 8px;        }        th {            background-color: #f2f2f2;        }    </style></head><body>    <h2>Báo cáo phân phối theo giờ</h2>    <table>        <thead>            <tr>                <th>Giờ</th>                <th>Số lượng yêu cầu</th>            </tr>        </thead>        <tbody>            <tr>                <td>05</td>                <td>1</td>            </tr>            <tr>                <td>06</td>                <td>5</td>            </tr>            <tr>                <td>07</td>                <td>5</td>            </tr>            <tr>                <td>08</td>                <td>7</td>            </tr>            <tr>                <td>09</td>                <td>9</td>            </tr>            <tr>                <td>10</td>                <td>14</td>            </tr>            <tr>                <td>11</td>                <td>11</td>            </tr>            <tr>                <td>12</td>                <td>12</td>            </tr>            <tr>                <td>13</td>                <td>11</td>            </tr>            <tr>                <td>14</td>                <td>9</td>            </tr>            <tr>                <td>15</td>                <td>10</td>            </tr>            <tr>                <td>16</td>                <td>8</td>            </tr>            <tr>                <td>17</td>                <td>1</td>            </tr>            <tr>                <td>18</td>                <td>0</td>            </tr>            <tr>                <td>19</td>                <td>4</td>            </tr>        </tbody>    </table>    <p>Tổng kết: Lượng yêu cầu từ người dùng liên quan đến cổ vật lịch sử có phân bố theo giờ không đồng đều. Giờ có lượng yêu cầu cao nhất là lúc 10 giờ với 14 yêu cầu, tiếp theo là lúc 12 giờ với 12 yêu cầu. Thời điểm ít yêu cầu nhất là lúc 17 giờ.</p></body></html>```",
};

function aggregateInquiriesByHour(data: any) {
  const hourlyCounts = Array(24).fill(0);

  data.forEach((item: any) => {
    const hour = new Date(item.timestamp).getHours();
    hourlyCounts[hour] += 1;
  });

  return hourlyCounts;
}

function InquiryByHourTab() {
  const searchParams = useSearchParams();
  const fake = (searchParams.get("logo") || "on") === "on";

  const { sourceData, isFetching } = useStaticsHourlyDistributionQuery(
    undefined,
    {
      selectFromResult: ({ data, isFetching }) => {
        return {
          sourceData: data?.path_storage,
          bot_answer: data?.bot_answer?.replace(/```/g, ""),
          isFetching,
        };
      },
      skip: fake,
    }
  );

  const hourlyData = aggregateInquiriesByHour(
    (fake ? DUMMY_DATA.path_storage : sourceData) ?? []
  );

  const chartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: "Số lượt hỏi theo giờ trong ngày",
        data: hourlyData,
        borderColor: "rgba(43, 63, 229, 0.8)",
        backgroundColor: "rgba(43, 63, 229, 0.2)",
        borderWidth: 2,
        tension: 0.1,
      },
    ],
  };

  return (
    <div
      style={{
        paddingBottom: 60,
      }}
    >
      {isFetching ? (
        "Loading..."
      ) : (
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Line
              data={chartData}
              options={{
                plugins: {
                  title: {
                    text: `Tổng số lượt hỏi trong ngày: ${
                      (fake ? DUMMY_DATA.path_storage : sourceData)?.length
                    } lượt`,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `${context.label}: ${context.raw} inquiries`,
                    },
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Các giờ trong ngày",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Số lượng lượt hỏi",
                    },
                    beginAtZero: true,
                  },
                },
                maintainAspectRatio: false,
              }}
              height={500}
            />
          </Col>
          <div>
            {(fake ? DUMMY_DATA.path_storage : sourceData)
              ?.slice(-5)
              .map((item: any) => (
                <li key={item.timestamp}>
                  {moment(item.timestamp).format("LLLL")} - {item.user_name} -{" "}
                  {item.object_name} - {item.message}
                </li>
              ))}
          </div>
        </Row>
      )}
    </div>
  );
}

export default InquiryByHourTab;
