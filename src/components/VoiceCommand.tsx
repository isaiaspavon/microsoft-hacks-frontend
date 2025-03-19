// VoiceCommand.tsx → Enables hands-free navigation with speech recognition.

import { useState } from "react";

export function VoiceCommand({ onCommand }: { onCommand: (text: string) => void }) {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function startListening() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setRecording(true);
      setError(null);
    };

    recognition.onerror = (event: Event) => {
      const errorMessage = (event as any).error || "Unknown error occurred.";
      setError("Speech recognition error: " + errorMessage);
      setRecording(false);
    };

    recognition.onend = () => {
      setRecording(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onCommand(transcript);
    };

    recognition.start();
  }

  return (
    <div>
      <button onClick={startListening} disabled={recording}>
        {recording ? "Listening..." : "Start Voice Command"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
