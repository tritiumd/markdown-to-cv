import { OUTPUT_URL } from "@/constants/variables";

export async function previewAPI(uid: string): Promise<string> {
  const currentUrl = `${OUTPUT_URL}/${uid}`;
  const res = await fetch(currentUrl);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return await res.text();
}

export async function downloadAPI(
  uid: string,
  language: string
): Promise<void> {
  // TODO: check the legit later
  const currentUrl = `${OUTPUT_URL}/${uid}?download=true&language=${language}`;
  try {
    const res = await fetch(currentUrl);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    // Temporary set filename to cv.pdf
    a.download = "cv.pdf";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download data:", error);
    throw error;
  }
}

export async function submitAPI(
  values: any,
  formLanguage: string
): Promise<string> {
  const url =
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000/api/v1";
  try {
    const response = await fetch(
      `${url}/submit-form?language=${formLanguage}`,
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
  } catch (error) {
    console.error("Failed to submit the data:", error);
    throw error;
  }
}
