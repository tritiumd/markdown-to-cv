import { BASE_URL } from "@/constants/variables";

export async function submitForm({
  values,
  formLanguage,
}: {
  values: any;
  formLanguage: string;
}): Promise<string> {
  const response = await fetch(
    `${BASE_URL}/submit-form?language=${formLanguage}`,
    {
      method: "POST",
      body: JSON.stringify(values),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to submit the data. Please try again.");
  }
  const data = await response.json();
  return data.uid;
}

export async function getPreviewCV(): Promise<string> {}

export async function downloadCV(uid: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/download-cv?uid=${uid}`);
  if (!response.ok) {
    throw new Error("Failed to download the CV. Please try again.");
  }
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cv.pdf";
  a.click();
  window.URL.revokeObjectURL(url);
}
