import { Tabs, TabsProps } from "antd";
import AgeTab from "./Age/intex";
import ArtifactInterestTab from "./ArtifactInterestTab/intex";
import InquiryByHourTab from "./InquiryByHourTab/intex";
import ClusterTab from "./ClusterTab/intex";

function Statistics() {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Thống kê số lượt hỏi theo giờ trong ngày",
      children: <InquiryByHourTab />,
    },
    {
      key: "2",
      label: "Thống kê cổ vật được quan tâm",
      children: <ArtifactInterestTab />,
    },
    {
      key: "3",
      label: "Thống kê độ tuổi",
      children: <AgeTab />,
    },
    {
      key: "4",
      label: "Phân cụm người dùng",
      children: <ClusterTab />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
}

export default Statistics;
