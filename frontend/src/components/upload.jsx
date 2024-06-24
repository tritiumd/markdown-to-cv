"use client";
import React, { useEffect, useState, useMemo, useLayoutEffect } from "react";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Flex, message, Upload } from "antd";
import _ from "lodash";
const { Dragger } = Upload;

// const url = "http://localhost:8000/api/v1";
const url = process.env.NEXT_PUBLIC_MY_URL;
export default function UploadField() {
  const [uploadedList, setUploadedList] = useState([]);
  const [outputMap, setOutputMap] = useState({});

  const props = {
    name: "file",
    multiple: true,
    action: `${url}/uploadfile`,
    onChange({ file, fileList, event }) {
      console.log(file.status);
      if (file.status == "removed") {
        setOutputMap(_.omit(outputMap, [file.uid]));
        setUploadedList(uploadedList.filter((info) => info.uid !== file.uid));
      }
      if (file.status !== "uploading") {
        console.log("File status!", file, fileList);
      }
      if (file.status === "done") {
        message.success(`${file.name} file uploaded successfully.`);
        const value = file.response.uid;
        let callAPI = `${url}/outputfile?file_uid=${value}`;
        file.url = callAPI;
        setUploadedList((prev) => [file, ...prev]);
        console.log("File list:", fileList);
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
      removeIcon: (
        <DeleteOutlined
          onClick={(e) => console.log(e, "custom removeIcon event")}
        />
      ),
    },
    onDownload(e) {
      // console.log("download", e);
      // window.open
    },
  };
  return (
    <Flex gap="middle" wrap className="p-24">
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          {" "}
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
    </Flex>
  );
}
