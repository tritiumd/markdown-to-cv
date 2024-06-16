
import MainNav from "@/components/main-nav";
import UploadField from "@/components/upload";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MainNav />

      <UploadField />
    <div className="">
            Author: <a href="https://github.com/kidclone3" target="_blank" rel="noopener noreferrer" className="underline">Delus</a>
    </div>
              
    </main>
  );
}
