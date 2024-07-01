import Footer from "@/components/footer";
import MainNav from "@/components/mainNav";
import UploadField from "@/components/upload";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 break-words">
      <MainNav className="flex" />

      <UploadField className="flex-row grow w-full h-4/5"/>

      <Footer className="mt-auto"/>
    </main>
  );
}
