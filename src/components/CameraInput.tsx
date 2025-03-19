// CameraInput.tsx → Handles live camera input for object detection.

import { useRef, useState } from "react";
import { useAzureBlob } from "../hooks/useAzureBlob";

export function CameraInput() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { upload, fileUrl, uploading, error } = useAzureBlob();

  async function startCamera() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  }

  async function captureImage() {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Convert canvas image to Blob
    canvas.toBlob(async (blob) => {
      if (blob) {
        const file = new File([blob], `captured-${Date.now()}.png`, { type: "image/png" });
        await upload(file);
      }
    }, "image/png");

    stopCamera();
  }

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline style={{ width: "100%" }} />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={captureImage} disabled={!stream || uploading}>Capture</button>
      <button onClick={stopCamera} disabled={!stream}>Stop Camera</button>

      {uploading && <p>Uploading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {fileUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={fileUrl} alt="Captured" style={{ width: "100%" }} />
        </div>
      )}
    </div>
  );
}
