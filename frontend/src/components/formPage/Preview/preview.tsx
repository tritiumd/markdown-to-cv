"use client";
import * as React from "react";

import parse from "node-html-parser";
import { useSelector } from "react-redux";
import { getApiUrl } from "@/store/slice";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast";

const MAX_RETRIES = 5;

const Preview: React.FC = () => {
  const {toast} = useToast();
  const [content, setContent] = React.useState<string>("");
  const currentUrl = useSelector(getApiUrl);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const fetchData = React.useCallback(async () => {
    let retries = 0;
    while (retries < MAX_RETRIES) {
      try {
        const res = await fetch(currentUrl);
        if (!res.ok) {
          if (res.status === 404 || res.status === 202) {
            if (res.status === 202) {
              toast({description: "Pending",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
              })
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            retries++;
            continue;
          }
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.text();
        const root = parse(data);
        const contentString = root.toString();
        setContent(contentString);
        setIsLoading(false);
        setError(null);
        return;
      } catch (error) {
        console.error("Failed to fetch data:", error);
        retries++;
      }
    }
    setIsLoading(false);
    setError("Failed to fetch data after multiple attempts");
  }, [currentUrl]);

  React.useEffect(() => {
    setIsLoading(true);
    setError(null);
    const abortController = new AbortController();
    fetchData();
    return () => abortController.abort();
  }, [fetchData]);
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
