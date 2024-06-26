import React from "react";
import MainNav from "@/components/mainNav";
import FormUploadField from "@/components/formUploadField";
export default function FormPage() {
  return (
    <main className="min-h-screen flex-col items-center justify-between p-2">
      <MainNav />
      <FormUploadField />
    </main>
  );
}
