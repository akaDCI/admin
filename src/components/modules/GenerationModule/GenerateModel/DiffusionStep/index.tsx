import { Button, Col, Flex, Image, Row } from "antd";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import Typography from "@/components/core/common/Typography";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import { createQueryString } from "@/utils/queryString";
import { useEffect, useState } from "react";
import _ from "lodash";
import ReactComparitionItem from "./ReactComparitionItem";
import { DIFFUSIONS } from "@/helpers/data/diffusion";

function DiffusionStep() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const currentStep = Number(searchParams.get("currentStep")) || 0;
  const runMode = searchParams.get("runMode") || "demo";

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState(runMode === "demo" ? DIFFUSIONS : []);

  useEffect(() => {
    if (runMode !== "demo") {
      setData([]);
    }
  }, [runMode]);

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
    <div className="my-5">
      <Flex gap={8} align="center" className="mb-5">
        <Typography.Title level={5}>
          Hình ảnh sau khi phục hồi ({data?.length} hình ảnh):
        </Typography.Title>
      </Flex>
      <Row gutter={[16, 16]}>
        {data.map((item, index) => (
          <Col key={index} span={6}>
            <ReactComparitionItem data={item} index={index} />
          </Col>
        ))}
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
          Tiếp tục
        </Button>
      </Flex>
    </div>
  );
}

export default DiffusionStep;
