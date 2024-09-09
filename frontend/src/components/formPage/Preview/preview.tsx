"use client";
import * as React from "react";

import { previewAPI } from "@/app/form/routes/Api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getCurrentUID } from "@/store/slice";
import { Loader2 } from "lucide-react";
import parse from "node-html-parser";
import { useSelector } from "react-redux";

const MAX_RETRIES = 5;

const Preview: React.FC = () => {
  const {toast} = useToast();
  const [content, setContent] = React.useState<string>("");
  const currentUID = useSelector(getCurrentUID);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const fetchData = React.useCallback(async () => {
    try {
      const data = await previewAPI(currentUID, toast);
      const root = parse(data);
      const contentString = root.toString();
      setContent(contentString);
      setIsLoading(false);
      setError(null);
      return;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setIsLoading(false);
      setError("Failed to fetch data after multiple attempts");
    }
  }, [currentUID]);

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
        <iframe
          className="w-full h-full"
          srcDoc={content}></iframe>
      )}
    </div>
  );
};
export default Preview;
