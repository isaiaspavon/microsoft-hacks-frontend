import { useState } from "react";
import FileUploader from "./components/FileUploader";
import { CameraInput } from "./components/CameraInput";
import TextReader from "./components/TextReader";
import { LanguageSelector } from "./components/LanguageSelector";
import { useAzureVision } from "./hooks/useAzureVision";
import { useAzureOCR } from "./hooks/useAzureOCR";
import { useAzureSpeech } from "./hooks/useAzureSpeech";
import { useAzureTranslator } from "./hooks/useAzureTranslator";
import { useAzureBlob } from "./hooks/useAzureBlob";

export function App() {
  // State Management
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>("en");

  // Custom Hooks
  const { analyzeImage, visionResult, loading: visionLoading } = useAzureVision();
  const { extractText, ocrResult, loading: ocrLoading } = useAzureOCR();
  const { generateSpeech, audioUrl, loading: speechLoading } = useAzureSpeech();
  const { translateText, loading: translateLoading } = useAzureTranslator();
  const { upload, fileUrl, uploading: blobUploading } = useAzureBlob();

  // Handle Image Capture & Upload
  async function handleImageUpload(file: File) {
    await upload(file);
  }

  function handleImageCapture(imageData: string) {
    setImageUrl(imageData);
    analyzeImage(imageData);
    extractText(imageData);
  }

  // Handle OCR Extraction
  function handleTextExtraction() {
    if (ocrResult) {
      setExtractedText(ocrResult);
      generateSpeech(ocrResult);
    }
  }

  // Handle Translation
  async function handleTranslation() {
    if (extractedText) {
      const translated = await translateText(extractedText, language);
      setTranslatedText(translated);
    }
  }

  return (
    <div>
      <h1>AI-Based Accessibility Tool</h1>

      {/* Upload and Capture */}
      <FileUploader onUpload={handleImageUpload} />
      <CameraInput onCapture={handleImageCapture} />

      {/* Results */}
      {fileUrl && <img src={fileUrl} alt="Uploaded" style={{ width: "100%" }} />}
      {imageUrl && <img src={imageUrl} alt="Captured" style={{ width: "100%" }} />}

      {/* OCR Text Extraction */}
      <button onClick={handleTextExtraction} disabled={ocrLoading}>
        {ocrLoading ? "Extracting..." : "Extract Text"}
      </button>

      {/* Display Extracted Text */}
      {extractedText && <TextReader text={extractedText} audioUrl={audioUrl} />}

      {/* Translation */}
      <LanguageSelector onLanguageChange={setLanguage} />
      <button onClick={handleTranslation} disabled={translateLoading}>
        {translateLoading ? "Translating..." : "Translate Text"}
      </button>
      {translatedText && <p>Translated: {translatedText}</p>}

      {/* Loading Status */}
      {visionLoading && <p>Analyzing Image...</p>}
      {blobUploading && <p>Uploading Image...</p>}
      {speechLoading && <p>Generating Speech...</p>}
    </div>
  );
}


/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/