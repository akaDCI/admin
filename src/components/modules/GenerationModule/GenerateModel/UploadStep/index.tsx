"use client";

import { Flex, Select, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import _ from "lodash";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";

import { createQueryString } from "@/utils/queryString";

import Button from "@/components/core/common/Button";
import { FileState } from "@/components/core/common/upload/multi-image";
import ImageUpload from "./ImageUpload";
import VideoUpload from "./VideoUpload";

function UploadStep() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [fileVideo, setFileVideo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentStep = Number(searchParams.get("currentStep")) || 0;
  const dataType = searchParams.get("dataType") || "";

  const handleNext = _.debounce(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push(createQueryString("currentStep", `${currentStep + 1 ?? ""}`));
    }, 5000);
  }, 300);

  const handleBack = _.debounce(() => {
    router.push(createQueryString("currentStep", `${currentStep - 1 ?? ""}`));
  }, 300);

  const handleChangeDataType = _.debounce((e) => {
    router.push(createQueryString("dataType", `${e ?? ""}`));
  }, 300);

  return (
    <div className="mt-10">
      <Flex gap={8} align="center" className="mb-5">
        <Typography.Title level={5}>Chọn loại dữ liệu: </Typography.Title>
        <Select
          placeholder="Chọn loại dữ liệu"
          options={[
            {
              label: "Ảnh",
              value: "image",
            },
            {
              label: "Video",
              value: "video",
            },
          ]}
          defaultValue={dataType || "image"}
          className="w-[100px]"
          onChange={handleChangeDataType}
        />
      </Flex>
      {dataType === "video" ? (
        <VideoUpload fileVideo={fileVideo} setFileVideo={setFileVideo} />
      ) : (
        <ImageUpload fileStates={fileStates} setFileStates={setFileStates} />
      )}
      <Flex justify="center" gap={20} className="mt-10">
        <Button onClick={handleBack} disabled={currentStep === 0}>
          Quay lại
        </Button>
        <Button
          type="primary"
          onClick={handleNext}
          disabled={fileStates.length === 0 && !fileVideo}
          loading={isLoading}
        >
          Tiếp tục
        </Button>
      </Flex>
    </div>
  );
}

export default UploadStep;
