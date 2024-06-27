"use client";

import _ from "lodash";
import { Typography } from "antd";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import { RollbackOutlined } from "@ant-design/icons";

import UploadStep from "../UploadStep";
import KeyFrameStep from "../KeyFrameStep";
import CrackDetectionStep from "../CrackDetectionStep";
import DiffusionStep from "../DiffusionStep";
import ModelingStep from "../ModelingStep";

import Button from "@/components/core/common/Button";
import Steps from "@/components/core/common/Steps";

import * as S from "./styles";
import { createQueryString } from "@/utils/queryString";

function GenerateModel() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentStep = Number(searchParams.get("currentStep")) || 0;
  const runMode = searchParams.get("runMode") || "demo";

  const items = [
    {
      title: "Upload Image/Video",
      description: "Tải lên dữ liệu cần phục hồi",
    },
    {
      title: "Key frames and enhancement",
      description: "Chọn các khung hình chính và cải thiện chất lượng",
    },
    {
      title: "Crack detection",
      description: "Phát hiện các vết nứt trong hình ảnh hoặc video",
    },
    {
      title: "Diffusion",
      description: "Áp dụng quá trình khuếch tán để cải thiện hình ảnh",
    },
    {
      title: "3D Modeling",
      description: "Tạo mô hình 3D từ dữ liệu đã tải lên",
    },
  ];

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <UploadStep />;
      case 1:
        return <KeyFrameStep />;
      case 2:
        return <CrackDetectionStep />;
      case 3:
        return <DiffusionStep />;
      case 4:
        return <ModelingStep />;
      default:
        return null;
    }
  };

  const onChange = (current: number) => {
    router.push(`${createQueryString("currentStep", `${current}`)}`);
  };

  const switchMode = () => {
    router.push(
      `${createQueryString("runMode", runMode === "demo" ? "real" : "demo")}`
    );
  };

  return (
    <S.PageWrapper>
      <S.Head>
        <Typography.Title level={2} onClick={switchMode}>
          Phục hồi cổ vật
        </Typography.Title>
        <Button danger icon={<RollbackOutlined />}>
          Bắt đầu lại tiến trình
        </Button>
      </S.Head>
      <Steps
        current={currentStep}
        onChange={onChange}
        percent={60}
        labelPlacement="vertical"
        items={items}
      />
      <div className=" min-h-[400px]">{renderContent()}</div>
    </S.PageWrapper>
  );
}

export default GenerateModel;
