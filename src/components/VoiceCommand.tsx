// VoiceCommand.tsx → Enables hands-free navigation with speech recognition.

import { useState } from "react";

export function VoiceCommand({ onCommand }: { onCommand: (text: string) => void }) {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function startListening() {
    const recognition = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
    
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setRecording(true);
      setError(null);
    };

    recognition.onerror = (event) => {
      setError("Speech recognition error: " + event.error);
      setRecording(false);
    };

    recognition.onend = () => {
      setRecording(false);
    };

    recognition.onresult = (event) => {
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
