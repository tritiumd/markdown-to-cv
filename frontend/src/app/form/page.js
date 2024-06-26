import React from "react";
import MainNav from "@/components/main-nav";
import FormUploadField from "@/components/form-upload-field";
export default function FormPage() {
  return (
    <main className="min-h-screen flex-col items-center justify-between p-2">
      <MainNav />
      <FormUploadField />
    </main>
  );
}
