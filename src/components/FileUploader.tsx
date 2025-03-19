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