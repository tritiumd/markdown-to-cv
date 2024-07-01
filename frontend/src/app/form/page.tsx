import Footer from "@/components/footer";
import CvForm from "@/components/formPage/cvForm";
import MainNav from "@/components/mainNav";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Image from "next/image";
export default function FormPage() {
  return (
    <main className="min-h-screen flex-col items-center justify-between p-2">
      <MainNav />
      <ResizablePanelGroup direction="horizontal" className="w-full">
        <ResizablePanel defaultSize={35} minSize={30}>
          <CvForm />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <div className="w-full">
            <Image
              src="/assets/Image_placeholder_upright.png"
              alt="hero"
              width={500}
              height={500}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <Footer />
    </main>
  );
}
