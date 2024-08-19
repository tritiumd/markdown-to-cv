"use client";
import * as React from "react";

import parse from "node-html-parser";
import { useSelector } from "react-redux";
import { getApiUrl } from "@/store/slice";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const MAX_RETRIES = 5;

const Preview: React.FC = () => {
  const [content, setContent] = React.useState<string>("");
  const currentUrl = useSelector(getApiUrl);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [retryCount, setRetryCount] = React.useState<number>(0);
  React.useEffect(() => {
    setIsLoading(true);
    const fetchData = () => {
      if (retryCount >= MAX_RETRIES) {
        console.error("Maximum retries reached. Stopping further attempts.");
        setIsLoading(false);
        return;
      }
      fetch(currentUrl)
        .then((res) => {
          if (!res.ok && res.status === 404) {
            // If status code is 404, wait 1s and refetch
            setTimeout(() => {
              setRetryCount(retryCount + 1);
              fetchData(); // Call fetchData again to refetch
            }, 1000);
            return Promise.reject("404 Not Found");
          }
          return res.text();
        })
        .then((data) => {
          const root = parse.parse(data);
          setContent(root.toString());
          setIsLoading(false);
          setRetryCount(0);
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
          // Stop fetching if error occurs
          setIsLoading(false);
        })
    };

    fetchData(); // Initial fetch
  }, [currentUrl, content]);
  return (
    <div className="w-full h-full">
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        </div>
      ) : (
        <iframe className="w-full h-full" srcDoc={content}></iframe>
      )}
    </div>
  );
};
export default Preview;
