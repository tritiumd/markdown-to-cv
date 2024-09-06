"use client";
import { Footer } from "@/components/common/footer/Footer";
import { Navbar } from "@/components/common/navbar/Navbar";

import UploadField from "@/components/uploadPage/upload";
import { Metadata } from "next";
import FormPage from "./form/page";
import FormGroup from "@/components/formPage/ResizableGroup/resizableGroup";

export default function Home() {
  return (
    <main className="flex-col items-center break-words">
      <Navbar />

      <FormGroup defaultLayout={[50, 50]} />

      {/* <Footer className="grow self-end" /> */}
    </main>
  );
}
