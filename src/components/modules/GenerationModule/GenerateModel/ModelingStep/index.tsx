import _ from "lodash";
import { useEffect, useState } from "react";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import { Button, Col, Flex, Image, Row, message } from "antd";

import { createQueryString } from "@/utils/queryString";

import Typography from "@/components/core/common/Typography";
import ExperienceBefore from "./ExperienceBefore";
import ExperienceAfter from "./ExperienceAfter";

function ModelingStep() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentStep = Number(searchParams.get("currentStep")) || 0;

  const handleNext = _.debounce(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push(createQueryString("currentStep", `0`));
    }, 5000);
  }, 300);

  const handleBack = _.debounce(() => {
    router.push(createQueryString("currentStep", `${currentStep - 1 ?? ""}`));
  }, 300);

  return (
    <div className="my-5">
      <Flex gap={8} align="center" className="mb-5">
        <Typography.Title level={5}>Model 3D:</Typography.Title>
      </Flex>
      <Row gutter={16}>
        <Col span={12}>
          <ExperienceBefore />
        </Col>
        <Col span={12}>
          <ExperienceAfter />
        </Col>
      </Row>
      <Flex justify="center" gap={20} className="my-5">
        <Button onClick={handleBack} disabled={currentStep === 0}>
          Quay lại
        </Button>
        <Button
          type="primary"
          onClick={handleNext}
          //   disabled={fileStates.length === 0 && !fileVideo}
          loading={isLoading}
        >
          Kết thúc
        </Button>
      </Flex>
    </div>
  );
}

export default ModelingStep;
