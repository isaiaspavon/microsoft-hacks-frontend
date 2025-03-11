// Uses Azure Speech Services to convert text to speech.

import { useState } from "react";
import { textToSpeech } from "../services/azureSpeech";

export function useAzureSpeech() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateSpeech(text: string) {
    setLoading(true);
    setError(null);
    try {
      const blob = await textToSpeech(text);
      const url = URL.createObjectURL(blob); // Convert Blob to URL
      setAudioUrl(url);
    } catch (err) {
      setError("Failed to generate speech.");
    } finally {
      setLoading(false);
    }
  }

  return { audioUrl, generateSpeech, loading, error };
}

