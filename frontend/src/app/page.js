import Footer from "@/components/footer";
import MainNav from "@/components/main-nav";
import UploadField from "@/components/upload";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MainNav />

      <UploadField />
    
      <Footer />        
    </main>
  );
}
