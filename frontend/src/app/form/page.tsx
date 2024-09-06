import FormGroup from "@/components/formPage/ResizableGroup/resizableGroup";

import { Metadata } from "next";
import { Navbar } from "@/components/common/navbar/Navbar";

export const metadata: Metadata = {
  title: "Tritiumd Form",
};

export default function FormPage() {
  return (
    <main className="flex-col items-center break-words">
      <Navbar />
      <FormGroup defaultLayout={[50, 50]} />
    </main>
  );
}
