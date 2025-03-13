// FileUploader.tsx → Allows users to upload images for text extraction.

import { useState } from "react";
import { useAzureBlob } from "../hooks/useAzureBlob";

export default function FileUploader() {
  const { fileUrl, upload, uploading, error } = useAzureBlob(); // ✅ Correct hook usage
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await upload(selectedFile);
      setSelectedFile(null); // Reset file after upload
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile || uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {fileUrl && (
        <div>
          <p>Uploaded File:</p>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            {fileUrl}
          </a>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

/*
import { useState } from "react";
import { useAzureBlob } from "../hooks/useAzureBlob";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const { fileUrl, upload, uploading, error } = useAzureBlob();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      upload(file);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-2">Upload an Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <button
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {fileUrl && (
        <div className="mt-2">
          <p className="text-green-600">Upload successful!</p>
          <img src={fileUrl} alt="Uploaded file" className="mt-2 max-w-full h-auto rounded-md" />
        </div>
      )}
    </div>
  );
}

*/