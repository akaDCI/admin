import { KEYFRAMES } from "@/helpers/data/keyframes";
import { Image } from "antd";
import { useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

function ReactComparitionItem({
  data,
  index,
}: {
  data: {
    src: string;
    alt: string;
  };
  index: number;
}) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  return (
    <>
      {isMouseOver ? (
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={data.src}
              srcSet={data.src}
              alt="Image one"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={KEYFRAMES[index].src}
              srcSet={KEYFRAMES[index].src}
              alt="Image two"
            />
          }
          onMouseLeave={() => setIsMouseOver(false)}
        />
      ) : (
        <Image
          src={data.src}
          alt={data.alt}
          width="100%"
          onMouseEnter={() => setIsMouseOver(true)}
        />
      )}
    </>
  );
}

export default ReactComparitionItem;
