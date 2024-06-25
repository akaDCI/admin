"use client";

import { Flex } from "antd";
import { useSearchParams } from "next/navigation";
import _ from "lodash";
import { useRouter } from "next-nprogress-bar";

import Button from "@/components/core/common/Button";

import { createQueryString } from "@/utils/queryString";

import * as S from "./styles";

function UploadStep() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const currentStep = Number(searchParams.get("currentStep")) || 0;

  const handleNext = _.debounce(() => {
    router.push(createQueryString("currentStep", `${currentStep + 1 ?? ""}`));
  }, 300);

  const handleBack = _.debounce(() => {
    router.push(createQueryString("currentStep", `${currentStep - 1 ?? ""}`));
  }, 300);

  return (
    <>
      <Flex justify="center" gap={20}>
        <Button onClick={handleBack} disabled={currentStep === 0}>
          Quay lại
        </Button>
        <Button
          type="primary"
          onClick={handleNext}
          disabled={currentStep === 4}
        >
          Tiếp tục
        </Button>
      </Flex>
    </>
  );
}

export default UploadStep;
