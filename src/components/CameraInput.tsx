// CameraInput.tsx → Handles live camera input for object detection.

import { useRef, useState } from "react";

export function CameraInput({ onCapture }: { onCapture: (image: string) => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

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

  function captureImage() {
    if (!videoRef.current) return;
    
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    
    if (!context) return;
    
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    const imageData = canvas.toDataURL("image/png");
    onCapture(imageData);
    
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
      <button onClick={captureImage} disabled={!stream}>Capture</button>
      <button onClick={stopCamera} disabled={!stream}>Stop Camera</button>
    </div>
  );
}
