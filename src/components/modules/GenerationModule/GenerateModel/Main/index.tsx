"use client";

import { Typography } from "antd";
import { useSearchParams } from "next/navigation";
import { RollbackOutlined } from "@ant-design/icons";
import _ from "lodash";

import Button from "@/components/core/common/Button";
import Steps from "@/components/core/common/Steps";
import UploadStep from "../UploadStep";

import * as S from "./styles";

function GenerateModel() {
  const searchParams = useSearchParams();

  const currentStep = Number(searchParams.get("currentStep")) || 0;

  const items = [
    {
      title: "Upload Image/Video",
      description: "Tải lên dữ liệu cần phục hồi",
    },
    {
      title: "Key frames and enhancement",
      description: "Tải lên dữ liệu cần phục hồi",
    },
    {
      title: "Crack detection",
      description: "Tải lên dữ liệu cần phục hồi",
    },
    {
      title: "Diffusion",
      description: "Tải lên dữ liệu cần phục hồi",
    },
    {
      title: "3D Modeling",
      description: "Tải lên dữ liệu cần phục hồi",
    },
  ];

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <UploadStep />;
      case 1:
        return <div>Step 2</div>;
      case 2:
        return <div>Step 3</div>;
      case 3:
        return <div>Step 4</div>;
      case 4:
        return <div>Step 5</div>;
      default:
        return null;
    }
  };

  return (
    <S.PageWrapper>
      <S.Head>
        <Typography.Title level={2}>Phục hồi cổ vật</Typography.Title>
        <Button danger icon={<RollbackOutlined />}>
          Bắt đầu lại tiến trình
        </Button>
      </S.Head>
      <Steps
        current={currentStep}
        percent={60}
        labelPlacement="vertical"
        items={items}
      />

      <div className=" min-h-[400px]" />
      {renderContent()}
    </S.PageWrapper>
  );
}

export default GenerateModel;
