// Calls Azure Translator API to translate extracted text.

import { useState } from "react";
import { translateText } from "../services/azureTranslator";

export function useAzureTranslator() {
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function translate(text: string, targetLang: string) {
    setLoading(true);
    setError(null);
    try {
      const response = await translateText(text, targetLang);
      setTranslatedText(response);
    } catch (err) {
      setError("Translation failed.");
    } finally {
      setLoading(false);
    }
  }

  return { translatedText, translate, loading, error };
}
