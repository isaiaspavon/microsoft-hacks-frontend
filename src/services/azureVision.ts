// Sends image data to Azure AI Vision API and returns object detection results.

const visionEndpoint = import.meta.env.VITE_AZURE_VISION_ENDPOINT;
const visionKey = import.meta.env.VITE_AZURE_VISION_KEY;

export async function analyzeImage(imageUrl: string) {
    const response = await fetch(`${visionEndpoint}/vision/v3.2/analyze?visualFeatures=Objects`, {
        method: "POST",
        headers: {
            "Ocp-Apim-Subscription-Key": visionKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: imageUrl }),
    });

    if (!response.ok) {
        throw new Error(`Vision API error: ${response.statusText}`);
    }

    return await response.json();
}
