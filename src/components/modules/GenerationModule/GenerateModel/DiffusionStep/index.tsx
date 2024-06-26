import { Button, Col, Flex, Image, Row } from "antd";

import Typography from "@/components/core/common/Typography";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import { createQueryString } from "@/utils/queryString";
import { useState } from "react";
import _ from "lodash";

function DiffusionStep() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentStep = Number(searchParams.get("currentStep")) || 0;

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

  return (
    <div className="mt-10">
      <Flex gap={8} align="center" className="mb-5">
        <Typography.Title level={5}>Hình ảnh sau khi phục hồi</Typography.Title>
      </Flex>
      <Row gutter={[16, 16]}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
          <Col key={index} span={6}>
            <Image
              src="https://cdn.pixabay.com/photo/2024/06/06/06/58/pharmacy-8812002_1280.jpg"
              alt="image"
              width="100%"
              height={200}
            />
          </Col>
        ))}
      </Row>
      <Flex justify="center" gap={20} className="mt-10">
        <Button onClick={handleBack} disabled={currentStep === 0}>
          Quay lại
        </Button>
        <Button
          type="primary"
          onClick={handleNext}
          //   disabled={fileStates.length === 0 && !fileVideo}
          loading={isLoading}
        >
          Tiếp tục
        </Button>
      </Flex>
    </div>
  );
}

export default DiffusionStep;
