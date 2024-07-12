import CustomResizableGroup from "@/components/formPage/resizableGroup";

import * as React from "react";

import { Metadata } from "next";
import { Navbar } from "@/components/common/navbar/Navbar";

export const metadata: Metadata = {
  title: "Tritiumd Form",
};

export default function FormPage() {
  return (
    <main className="flex-col items-center break-words">
      <Navbar />
      <CustomResizableGroup defaultLayout={[50, 50]} />
    </main>
  );
}
