import Footer from "@/components/footer";
import CvForm from "@/components/formPage/cvForm";
import MainNav from "@/components/mainNav";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import * as React from "react";
export default function FormPage() {
  return (
    <main className="flex min-h-screen max-w-full flex-col items-center justify-between break-words">
      <MainNav className="" />
      <ResizablePanelGroup direction="horizontal" className="overflow-auto">
        <ResizablePanel defaultSize={34} minSize={30} order={1}>
          <CvForm />
        </ResizablePanel>
        <ResizableHandle className="" />

        <ResizablePanel defaultSize={67} order={2}>
          <Image
            src="/assets/Image_placeholder_upright.png"
            alt="hero"
            width={700}
            height={700}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
      <Footer className="h-32" />
    </main>
  );
}
