import { Image } from "antd";
import { useRef, useState } from "react";

function CompareItem() {
  const divRef = useRef<HTMLDivElement>(null);

  const [isShowSlider, setIsShowSlider] = useState(true);
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    mouseX: 400,
    mouseY: 300,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseInside(true);
    const { clientX, clientY } = event;
    const { top, left } = divRef.current?.getBoundingClientRect() || {
      top: 0,
      left: 0,
    };

    const mouseX = clientX - left;
    const mouseY = clientY - top;
    setMousePosition({
      mouseX,
      mouseY,
    });
  };

  const handleMouseLeave = () => {
    setIsMouseInside(false);
    setMousePosition({
      mouseX: 400,
      mouseY: 300,
    });
  };

  return (
    <div className=" flex flex-col relative w-[400px] h-[300px]">
      <div
        className="w-[400px] h-[300px] absolute top-6 left-6 z-40 bg-transparent"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={divRef}
        style={{
          cursor: "col-resize",
        }}
      ></div>
      {isShowSlider && (
        <div
          className="absolute bg-red-500 z-30 top-6 left-6"
          style={{
            height: "300px",
            width: "1px",
            display: !isMouseInside ? "none" : "block",
            transform: `translate(${mousePosition.mouseX}px,0)`,
          }}
        ></div>
      )}
      <Image
        className="absolute z-10 top-6 left-6 w-[400px] h-[300px]"
        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
      />
      <div
        style={{
          width:
            isShowSlider && isMouseInside
              ? `${mousePosition.mouseX}px`
              : "400px",
          height:
            isShowSlider && isMouseInside
              ? `${mousePosition.mouseY}px`
              : "300px",
          marginBottom: isShowSlider
            ? `${324 - mousePosition.mouseY}px`
            : "24px",
        }}
        className="h-[300px] bg-slate-200 m-6 relative cursor-col-resize group overflow-hidden"
      >
        <div
          className="absolute z-20 w-[400px] h-[300px] bg-white top-0 left-0 overflow-hidden"
          id="output"
          style={{
            mixBlendMode: "initial",
          }}
        >
          <Image
            src="https://cdn.pixabay.com/photo/2024/06/06/06/58/pharmacy-8812002_1280.jpg"
            style={{
              background: "white",
              width: "400px",
              height: "300px",
              border: "0px",
              outline: "0px",
            }}
          />
        </div>
      </div>
    </div>
    // <div>
    //   <Image
    //     src="https://cdn.pixabay.com/photo/2024/06/06/06/58/pharmacy-8812002_1280.jpg"
    //     alt="image"
    //     width="100%"
    //     preview={false}
    //     height={200}
    //   />
    // </div>
  );
}

export default CompareItem;
