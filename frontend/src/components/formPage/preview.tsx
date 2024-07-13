"use client";
import Image from "next/image";
import * as React from "react";
import { Card, CardContent } from "../ui/card";

import parse from "node-html-parser";
import { useSelector } from "react-redux";
import { getApiUrl } from "@/store/slice";
import { Button } from "../ui/button";
const Preview: React.FC = () => {
  const [content, setContent] = React.useState<string>("");
  const currentUrl = useSelector(getApiUrl);
  React.useEffect(() => {
    const fetchData = () => {
      fetch(currentUrl)
        .then((res) => {
          if (!res.ok && res.status === 404) {
            // If status code is 404, wait 1s and refetch
            setTimeout(() => {
              fetchData(); // Call fetchData again to refetch
            }, 1000);
            return Promise.reject("404 Not Found");
          }
          return res.text();
        })
        .then((data) => {
          const root = parse.parse(data);
          setContent(root.toString());
        })
        .catch((error) => console.error("Failed to fetch data:", error));
    };

    const timer = setTimeout(() => {
      fetchData(); // Initial fetch
    }, 2000); // 2000 milliseconds delay

    return () => clearTimeout(timer); // Cleanup the timeout on component unmount or when currentUrl changes
  }, [currentUrl]);
  return (
    <div className="w-full h-full">
      <Card className="m-auto w-full h-full">
        {/* Reload button */}
        <CardContent className="flex justify-end">
          <Button
            onClick={() => {
              fetch(currentUrl)
                .then((res) => res.text())
                .then((data) => {
                  const root = parse.parse(data);
                  setContent(root.toString());
                })
                .catch((error) =>
                  console.error("Failed to fetch data:", error)
                );
            }}
          />
        </CardContent>
        <iframe className="w-full h-full" srcDoc={content}></iframe>
      </Card>
    </div>
  );
};
export default Preview;
