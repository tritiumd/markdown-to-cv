import { Footer } from "@/components/common/footer/Footer";
import { Navbar } from "@/components/common/navbar/Navbar";

import UploadField from "@/components/uploadPage/upload";
import { Metadata } from "next";

export const metadata = {
  title: "Tritiumd",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between break-words">
      <Navbar className="flex" />

      <UploadField className="flex-row grow w-full h-4/5" />

      <Footer className="mt-auto" />
    </main>
  );
}
