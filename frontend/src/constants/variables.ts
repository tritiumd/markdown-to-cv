export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000/api/v1";
export const OUTPUT_URL = `${BASE_URL}/output-html`;
export const MAX_RETRIES = 5;
