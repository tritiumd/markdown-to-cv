"use client";
import { Footer } from "@/components/common/footer/Footer";
import { Navbar } from "@/components/common/navbar/Navbar";

import UploadField from "@/components/uploadPage/upload";
import { Metadata } from "next";
import FormPage from "./form/page";

// export const metadata: Metadata = {
//   title: "Tritiumd",
// };

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between break-words">
      <Navbar />

      <UploadField className="flex-row grow h-4/5 overflow-y-auto" />

      <Footer className="grow self-end" />
    </main>
  );
}
