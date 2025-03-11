// azureOCR.ts calls Azure Document Intelligence for text recognition.

const ocrEndpoint = import.meta.env.VITE_AZURE_OCR_ENDPOINT;
const ocrKey = import.meta.env.VITE_AZURE_OCR_KEY;

export async function extractText(imageUrl: string) {
    const response = await fetch(`${ocrEndpoint}/vision/v3.2/read/analyze`, {
        method: "POST",
        headers: {
            "Ocp-Apim-Subscription-Key": ocrKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: imageUrl }),
    });

    if (!response.ok) {
        throw new Error(`OCR API error: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
}
