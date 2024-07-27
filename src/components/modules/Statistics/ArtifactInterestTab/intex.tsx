"use client";

import { Col, Row } from "antd";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { useEffect, useMemo, useState } from "react";
import { useStaticsObjectDistributionQuery } from "@/store/queries/statics";
import { useSearchParams } from "next/navigation";

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
    "<html><head>    <title>Báo cáo phân phối cổ vật</title>    <style>        table {            width: 100%;            border-collapse: collapse;        }        table, th, td {            border: 1px solid black;        }        th, td {            padding: 10px;            text-align: left;        }        th {            background-color: #f2f2f2;        }    </style></head><body>    <h1>Báo cáo phân phối cổ vật</h1>    <table>        <tr>            <th>Tên cổ vật</th>            <th>Số lượng câu hỏi</th>        </tr>        <tr>            <td>Mũ thời Nguyễn</td>            <td>10</td>        </tr>        <tr>            <td>Bình gốm thời Nguyễn</td>            <td>7</td>        </tr>        <tr>            <td>Tượng Phật thời Nguyễn</td>            <td>9</td>        </tr>        <tr>            <td>Chén uống trà thời Nguyễn</td>            <td>10</td>        </tr>        <tr>            <td>Sách cổ thời Nguyễn</td>            <td>9</td>        </tr>        <tr>            <td>Kiếm thời Nguyễn</td>            <td>10</td>        </tr>        <tr>            <td>Đĩa sứ thời Nguyễn</td>            <td>10</td>        </tr>        <tr>            <td>Trống thời Nguyễn</td>            <td>4</td>        </tr>        <tr>            <td>Áo giáp thời Nguyễn</td>            <td>13</td>        </tr>        <tr>            <td>Tranh thêu thời Nguyễn</td>            <td>5</td>        </tr>    </table>    <p>Tổng cộng có 10 loại cổ vật được quan tâm với áo giáp thời Nguyễn nhận được số lượng câu hỏi nhiều nhất (13 câu hỏi). Các cổ vật khác như mũ, chén uống trà, kiếm và đĩa sứ thời Nguyễn cũng nhận được nhiều sự quan tâm, mỗi loại có 10 câu hỏi. Cổ vật ít được hỏi đến nhất là trống thời Nguyễn với chỉ 4 câu hỏi.</p></body></html>",
};

function aggregateArtifactData(data: any) {
  const artifactCounts: any = {};

  data.forEach((item: any) => {
    const artifact: any = item.object_name;
    if (artifactCounts[artifact]) {
      artifactCounts[artifact] += 1;
    } else {
      artifactCounts[artifact] = 1;
    }
  });

  return Object.entries(artifactCounts).map(([object_name, count]) => ({
    object_name,
    count,
  }));
}

function ArtifactInterestTab() {
  const searchParams = useSearchParams();
  const fake = (searchParams.get("logo") || "on") === "on";

  const { sourceData, bot_answer, isFetching } =
    useStaticsObjectDistributionQuery(undefined, {
      selectFromResult: ({ data, isFetching }) => {
        return {
          sourceData: data?.path_storage,
          bot_answer: data?.bot_answer?.replace(/```/g, ""),
          isFetching,
        };
      },
      skip: fake,
    });

  const artifactData = aggregateArtifactData(
    (fake ? DUMMY_DATA.path_storage : sourceData) || []
  );

  const chartData = {
    labels: artifactData.map((data) => data.object_name),
    datasets: [
      {
        label: "Interest Count",
        data: artifactData.map((data) => data.count),
        backgroundColor: [
          "rgba(43, 63, 229, 0.8)",
          "rgba(250, 192, 19, 0.8)",
          "rgba(253, 135, 135, 0.8)",
          "rgba(135, 253, 135, 0.8)",
          "rgba(135, 135, 253, 0.8)",
        ],
        borderColor: [
          "rgba(43, 63, 229, 0.8)",
          "rgba(250, 192, 19, 0.8)",
          "rgba(253, 135, 135, 0.8)",
          "rgba(135, 253, 135, 0.8)",
          "rgba(135, 135, 253, 0.8)",
        ],
        borderWidth: 1,
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
          <Col span={12}>
            <Bar
              data={chartData}
              options={{
                plugins: {
                  title: {
                    text: "Cổ vật được quan tâm",
                  },
                },
                // indexAxis: "x",
              }}
              height={500}
            />
          </Col>
          <Col span={12}>
            <div
              dangerouslySetInnerHTML={{
                __html: fake ? DUMMY_DATA.bot_answer : bot_answer,
              }}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ArtifactInterestTab;
