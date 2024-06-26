import { StepsProps } from "antd";

import * as S from "./styles";

export interface StepsCommonProps extends StepsProps {
  $margin?: number;
}

function Steps({ $margin, ...props }: StepsCommonProps) {
  return <S.StepsCommon $margin={$margin} {...props} />;
}

export default Steps;
