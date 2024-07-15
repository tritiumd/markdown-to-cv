"use client";
import * as React from "react";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadProps, UploadFile } from "antd";
import { BASE_URL } from "@/constants/variables";
import { cn } from "@/lib/utils";
const { Dragger } = Upload;

const url = BASE_URL;
export default function UploadField({ className }: { className?: string }) {
  const [uploadedList, setUploadedList] = React.useState<UploadFile[]>([]);

  // Config message
  message.config({
    top: 100,
    duration: 2,
    maxCount: 3,
  });

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: `${url}/upload-md`,
    beforeUpload: (file) => {
      // check if file is markdown or text/markdown
      const isMarkdown = file.type === "text/markdown";
      const isEndWithMD = file.name.toLowerCase().endsWith(".md");
      const isLt50K = file.size / 1024 < 50;

      if (!isMarkdown || !isEndWithMD) {
        message.error("You can only upload markdown file!");
      } else if (!isLt50K) {
        message.error("File must be smaller than 50KB!");
      }
      return isMarkdown && isEndWithMD && isLt50K;
    },

    onChange({ file, fileList, event }) {
      if (file.status == "removed") {
        setUploadedList(
          uploadedList.filter((info: UploadFile) => info.uid !== file.uid)
        );
      }
      if (file.status === "done") {
        message.success(`${file.name} file uploaded successfully.`);
        const value = file.response.uid;
        let callAPI = `${url}/output-html/${value}`;
        file.url = callAPI;
        setUploadedList((prev: any[]) => [file, ...prev]);
      } else if (file.status === "error") {
        message.error(`${file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    defaultFileList: [],
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: <DeleteOutlined />,
    },
    onDownload(e) {},
  };
  return (
    <Dragger {...props} className={cn("p-12", className)}>
      <p className="ant-upload-drag-icon">
        {" "}
        <InboxOutlined style={{ color: "black" }} />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
}
