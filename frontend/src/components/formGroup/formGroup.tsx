"use client";

import CvForm from "@/components/formGroup/MainForm/mainForm";
import Preview from "@/components/formGroup/Preview/preview";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./formGroup.css";
export default function FormGroup({
  defaultLayout = [50, 50],
}: {
  defaultLayout: number[] | undefined;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ResizablePanelGroup direction="horizontal" className="panel-group">
        <ResizablePanel defaultSize={defaultLayout[0]} minSize={30} order={1}>
          <CvForm />
        </ResizablePanel>
        <ResizableHandle className="" />
        <ResizablePanel defaultSize={defaultLayout[1]} order={2}>
          <Preview />
        </ResizablePanel>
      </ResizablePanelGroup>
    </QueryClientProvider>
  );
}
