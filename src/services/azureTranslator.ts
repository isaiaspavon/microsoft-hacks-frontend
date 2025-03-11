// Translates text into different languages using Azure Translator API.

const translatorKey = import.meta.env.VITE_AZURE_TRANSLATOR_KEY;
const translatorRegion = import.meta.env.VITE_AZURE_TRANSLATOR_REGION;

export async function translateText(text: string, targetLanguage: string) {
    const response = await fetch(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${targetLanguage}`, {
        method: "POST",
        headers: {
            "Ocp-Apim-Subscription-Key": translatorKey,
            "Ocp-Apim-Subscription-Region": translatorRegion,
            "Content-Type": "application/json",
        },
        body: JSON.stringify([{ text }]),
    });

    if (!response.ok) {
        throw new Error(`Translator API error: ${response.statusText}`);
    }

    return await response.json();
}
