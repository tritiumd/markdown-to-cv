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
    <main className="flex min-h-screen max-w-full flex-col items-center justify-between p-2 break-words">
      <MainNav className="" />
      <ResizablePanelGroup direction="horizontal" className="">
        <ResizablePanel defaultSize={34} minSize={30} className="">
          <CvForm />
        </ResizablePanel>
        <ResizableHandle className="" />
        <ResizablePanel className="">
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
