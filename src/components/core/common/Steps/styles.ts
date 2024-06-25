import styled from "styled-components";
import { Steps } from "antd";
import { StepsCommonProps } from ".";

export const StepsCommon = styled(Steps)<StepsCommonProps>`
  .ant-steps-item-content {
    width: 200px !important;
  }

  .ant-steps-item-icon {
    margin-inline-start: 80px !important;
  }
  .ant-steps-item-tail {
    margin-inline-start: 96px !important;
  }
  .ant-steps-item-title {
    display: flex !important;
    align-items: center;
    justify-content: center;

    height: 64px;
  }
`;
