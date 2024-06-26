"use client";

import _ from "lodash";
import { Dispatch, SetStateAction, useState } from "react";

import {
  FileState,
  MultiImageDropzone,
} from "@/components/core/common/upload/multi-image";
import { useEdgeStore } from "@/components/libs/edgestore";

interface Props {
  fileStates: FileState[];
  setFileStates: Dispatch<SetStateAction<FileState[]>>;
}

function ImageUpload({ fileStates, setFileStates }: Props) {
  const [uploadRes, setUploadRes] = useState<
    {
      url: string;
      filename: string;
    }[]
  >([]);
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  return (
    <>
      <MultiImageDropzone
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 100,
          maxSize: 1024 * 1024 * 10, // 1 MB
        }}
        onChange={setFileStates}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
        }}
      />
      {/* <Button
        className="mt-2"
        onClick={async () => {
          await Promise.all(
            fileStates.map(async (fileState) => {
              try {
                if (
                  fileState.progress !== "PENDING" ||
                  typeof fileState.file === "string"
                ) {
                  return;
                }
                const res = await edgestore.myPublicImages.upload({
                  file: fileState.file,
                  onProgressChange: async (progress) => {
                    updateFileProgress(fileState.key, progress);
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(fileState.key, "COMPLETE");
                    }
                  },
                });
                setUploadRes((uploadRes) => [
                  ...uploadRes,
                  {
                    url: res.url,
                    filename:
                      typeof fileState.file === "string"
                        ? fileState.file
                        : fileState.file.name,
                  },
                ]);
              } catch (err) {
                updateFileProgress(fileState.key, "ERROR");
              }
            })
          );
        }}
        disabled={
          !fileStates.filter((fileState) => fileState.progress === "PENDING")
            .length
        }
      >
        Upload
      </Button> */}
      {uploadRes.length > 0 && (
        <div className="mt-2">
          {uploadRes.map((res) => (
            <a
              key={res.url}
              className="mt-2 block underline"
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {res.filename}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

export default ImageUpload;
