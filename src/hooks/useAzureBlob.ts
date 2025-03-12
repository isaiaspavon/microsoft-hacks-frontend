// Handles uploading and retrieving images from Azure Blob Storage.

import { useState } from "react";
import { uploadImage as uploadToAzure, getFileUrl } from "../services/azureBlob";

export function useAzureBlob() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const response = await uploadToAzure(file);
      setFileUrl(response.url); // Ensure backend returns a JSON { url: "https://..." }
    } catch (err) {
      setError("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

  async function fetchFileUrl(fileName: string) {
    try {
      const url = await getFileUrl(fileName);
      setFileUrl(url);
    } catch (err) {
      setError("Failed to retrieve file URL.");
    }
  }

  return { fileUrl, upload, fetchFileUrl, uploading, error };
}

/*
import { useState } from "react";
import { uploadImage, getImageUrl } from "../services/azureBlob";

export function useAzureBlob() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const response = await uploadImage(file);
      setFileUrl(response.url); // Assuming API returns { url: "https://..." }
    } catch (err) {
      setError("File upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function fetchFileUrl(fileName: string) {
    setUploading(true);
    setError(null);
    try {
      const response = await getImageUrl(fileName);
      setFileUrl(response);
    } catch (err) {
      setError("Failed to retrieve file URL.");
    } finally {
      setUploading(false);
    }
  }

  return { fileUrl, upload, fetchFileUrl, uploading, error };
}
  */