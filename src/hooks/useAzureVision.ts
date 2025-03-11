// useAzureVision.ts calls Azure AI Vision and returns detected objects.

import { useState } from "react";
import { analyzeImage } from "../services/azureVision";

export function useAzureVision() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function analyze(imageUrl: string) {
    setLoading(true);
    setError(null);
    try {
      const response = await analyzeImage(imageUrl);
      setAnalysis(response);
    } catch (err) {
      setError("Failed to analyze image.");
    } finally {
      setLoading(false);
    }
  }

  return { analysis, analyze, loading, error };
}
