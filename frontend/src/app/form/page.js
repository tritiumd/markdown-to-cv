import React from "react";
import MainNav from "@/components/mainNav";
import FormUploadField from "@/components/formPage/formUploadField";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Preview from "@/components/formPage/preview";

export default function FormPage() {
  return (
    <main className="min-h-screen flex-col items-center justify-between p-2">
      <MainNav />
      <div className="w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25} minSize={20}>
            <FormUploadField />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <Preview />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
