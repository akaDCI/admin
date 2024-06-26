"use client";

import _ from "lodash";
import { Upload, UploadProps } from "antd";
import { Dispatch, SetStateAction } from "react";
import { InboxOutlined, CloseOutlined } from "@ant-design/icons";

interface Props {
  fileVideo: File | null;
  setFileVideo: Dispatch<SetStateAction<File | null>>;
}

function VideoUpload({ fileVideo, setFileVideo }: Props) {
  const options: UploadProps = {
    name: "file",
    multiple: true,
    // action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info: any) {
      // console.log("🚀 ~ onChange ~ info:", info);
      // console.log("🚀 ~ onChange ~ info.file:", info.file);
      setFileVideo(info.file.originFileObj);
      // const { status } = info.file;
      // if (status !== "uploading") {
      //   console.log(info.file, info.fileList);
      // }
      // if (status === "done") {
      //   message.success(`${info.file.name} file uploaded successfully.`);
      // } else if (status === "error") {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      {fileVideo ? (
        <div className="w-1/2 mx-auto relative">
          <video
            src={fileVideo ? URL.createObjectURL(fileVideo) : ""}
            controls
            className="w-full"
          ></video>
          <div
            className=" absolute z-20 right-3 top-3 bg-black/50 w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-black/80 transition-all cursor-pointer"
            onClick={() => setFileVideo(null)}
          >
            <CloseOutlined
              style={{
                color: "white",
              }}
            />
          </div>
        </div>
      ) : (
        <Upload.Dragger {...options} fileList={[]}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Tải lên file video bằng cách kéo thả hoặc click vào đây!
          </p>
          <p className="ant-upload-hint">
            sử dụng định dạng video mp4, avi, mkv, ...
          </p>
        </Upload.Dragger>
      )}
    </>
  );
}

export default VideoUpload;
