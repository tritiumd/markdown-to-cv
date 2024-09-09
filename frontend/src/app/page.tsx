"use client";
import { Navbar } from "@/components/common/navbar/Navbar";

import FormGroup from "@/components/formPage/ResizableGroup/resizableGroup";

export default function Home() {
  return (
    <main className="flex-col items-center break-words">
      <Navbar />
 
      <FormGroup defaultLayout={[50, 50]} />

    </main>
  );
}
