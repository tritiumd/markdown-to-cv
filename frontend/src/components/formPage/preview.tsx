"use client";
import Image from "next/image";
import * as React from "react";
import { Card, CardContent } from "../ui/card";

import parse from "node-html-parser";
const Preview: React.FC = () => {
  const [content, setContent] = React.useState<string>("");
  React.useEffect(() => {
    fetch(
      "http://localhost:8000/api/v1/output-html/9f1434c1-c9fe-4770-91c3-a79e1732bd5e"
    )
      .then((res) => res.text())
      .then((data) => {
        const root = parse.parse(data);
        setContent(root.toString());
      })
      .catch((error) => console.error("Failed to fetch data:", error));
  }, []);
  return (
    <div className="w-full h-full">
      <Card className="m-auto w-full h-full">
        <iframe className="w-full h-full" srcDoc={content}></iframe>
      </Card>
    </div>
  );
};
export default Preview;
