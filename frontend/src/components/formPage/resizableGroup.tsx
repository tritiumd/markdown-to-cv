"use client";

import CvForm from "@/components/formPage/cvForm";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Preview from "@/components/formPage/preview";
import * as React from "react";
import "./resizableGroup.css";
export default function CustomResizableGroup({
  defaultLayout = [50, 50],
}: {
  defaultLayout: number[] | undefined;
}) {
  return (
    <ResizablePanelGroup direction="horizontal" className="panel-group">
      <ResizablePanel defaultSize={defaultLayout[0]} minSize={30} order={1}>
        <CvForm />
      </ResizablePanel>
      <ResizableHandle className="" />
      <ResizablePanel defaultSize={defaultLayout[1]} order={2}>
        <Preview />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
