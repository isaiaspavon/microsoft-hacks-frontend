// TextReader.tsx → Converts extracted text to speech.

import { useState } from "react";
import { useAzureSpeech } from "../hooks/useAzureSpeech";

export default function TextReader() {
  const [text, setText] = useState("");
  const { audioUrl, generateSpeech, loading, error } = useAzureSpeech();

  const handleReadText = () => {
    if (text.trim()) {
      generateSpeech(text);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-2">Text to Speech</h2>
      <textarea
        className="w-full p-2 border rounded-md"
        rows={3}
        placeholder="Enter text to read..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        onClick={handleReadText}
        disabled={loading}
      >
        {loading ? "Processing..." : "Read Aloud"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {audioUrl && (
        <audio controls className="mt-2 w-full">
          <source src={audioUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
