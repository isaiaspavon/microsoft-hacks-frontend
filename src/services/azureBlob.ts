// Uploads and retrieves images from Azure Blob Storage.

const blobConnectionString = import.meta.env.VITE_AZURE_BLOB_CONNECTION_STRING;
const blobContainerName = import.meta.env.VITE_AZURE_BLOB_CONTAINER_NAME;

export async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`/upload`, {  // Adjust backend endpoint if needed
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Blob Storage error: ${response.statusText}`);
    }

    return await response.json();
}
