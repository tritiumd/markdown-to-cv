"use client";
import React, { useEffect, useState, useMemo } from "react";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Flex, message, Upload } from "antd";
import _ from "lodash";
const { Dragger } = Upload;

const url = "http://127.0.0.1:8000/api/v1";
export default function UploadField() {
  const [uploadedList, setUploadedList] = useState([]);
  const [outputMap, setOutputMap] = useState({});
  // useMemo(() => {
  //   const fetchData = async () => {
  //     // for (const upload of uploadedList) {
  //     const newUploadedMap = Object.entries(uploadedMap).map(
  //       async ([uid, upload]) => {
  //         const output_id = upload?.response?.id;
  //         if (output_id) {
  //           try {
  //             const response = await fetch(
  //               `${url}/outputfile?file_id=${output_id}`
  //             );
  //             // Do something with the response data
  //             console.log("response: ", response);
  //             const fileURL = URL.createObjectURL(response.text());
  //             upload.response.url = fileURL.toString();
  //             return upload;
  //           } catch (error) {
  //             console.error(
  //               `Error fetching data for output file ${output_id}:`,
  //               error
  //             );
  //           }
  //         }
  //       }
  //     );
  //     setUploadedMap(newUploadedMap);
  //   };
  //   fetchData();
  // }, [uploadedMap]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const promises = Object.entries(outputMap).map(([key, value]) => {
  //       const fetchUrl = `${url}/outputfile?file_id=${value}`;
  //       return fetch(fetchUrl)
  //         .then((response) => response.json())
  //         .then((data) => ({ key, data }));
  //     });

  //     try {
  //       const data = await Promise.all(promises);
  //       // Do something with the data
  //       console.log("Fetched data:", data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, [outputMap]);

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
        const value = file.response.id;
        let callAPI = `${url}/outputfile?file_id=${value}`;
        file.url = callAPI;
        setUploadedList((prev) => [file, ...prev]);
        console.log("File list:", fileList);
      } else if (file.status === "error") {
        message.error(`${file.name} file upload failed.`);
      }

      // if (file?.response?.id) {
      //   setOutputMap((prev) => {
      //     return { ...prev, [file.uid]: file?.response?.id };
      //   });
      // }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    defaultFileList: [],
    // fileList: [...uploadedList],
    showUploadList: {
      // showDownloadIcon: true,
      // downloadIcon: (
      //   <a onClick={(e) => console.log(e, "custom Download event")}>Get CV</a>
      // ),
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
    <Flex gap="middle" wrap>
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
        {console.log("Uploaded list: ", uploadedList)}
      </Dragger>
    </Flex>
  );
}
