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

    return await response.json(); // Ensure backend returns { url: "https://..." }
}

// ✅ Add this function to retrieve a file URL from Azure Blob Storage
export async function getFileUrl(fileName: string): Promise<string> {
    // Construct the full URL using the Azure storage structure
    return `https://${blobConnectionString}.blob.core.windows.net/${blobContainerName}/${fileName}`;
}


/*
const blobConnectionString = import.meta.env.VITE_AZURE_BLOB_CONNECTION_STRING;
const blobContainerName = import.meta.env.VITE_AZURE_BLOB_CONTAINER_NAME;

// This function uploads an image file to Azure Blob Storage.
// It returns the URL of the uploaded image.
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

// This function uploads an image file to Azure Blob Storage.
// It returns the URL of the uploaded image.
export async function getImageUrl(fileName: string) {
    return `https://${blobContainerName}.blob.core.windows.net/${fileName}`;
}
    */