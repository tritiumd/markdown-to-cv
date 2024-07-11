"use client";

import Footer from "@/components/footer";
import CvForm from "@/components/formPage/cvForm";
import CustomResizableGroup from "@/components/formPage/resizableGroup";
import MainNav from "@/components/mainNav";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Image from "next/image";
import * as React from "react";
export default function FormPage() {
  return (
    <main className="flex-col items-center break-words">
      <MainNav className="" />
      <CustomResizableGroup defaultLayout={[50, 50]} />
    </main>
  );
}
