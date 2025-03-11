// Calls Azure Document Intelligence API to extract text from images.

import { useState } from "react";
import { extractText } from "../services/azureOCR";

export function useAzureOCR() {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function recognizeText(imageUrl: string) {
    setLoading(true);
    setError(null);
    try {
      const response = await extractText(imageUrl);
      setText(response);
    } catch (err) {
      setError("Failed to extract text.");
    } finally {
      setLoading(false);
    }
  }

  return { text, recognizeText, loading, error };
}
