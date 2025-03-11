// Converts extracted text to speech using Azure Speech Services.

const speechKey = import.meta.env.VITE_AZURE_SPEECH_KEY;
const speechRegion = import.meta.env.VITE_AZURE_SPEECH_REGION;

export async function textToSpeech(text: string) {
    const response = await fetch(`https://${speechRegion}.tts.speech.microsoft.com/cognitiveservices/v1`, {
        method: "POST",
        headers: {
            "Ocp-Apim-Subscription-Key": speechKey,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
        },
        body: `
            <speak version='1.0' xml:lang='en-US'>
                <voice xml:lang='en-US' xml:gender='Female' name='en-US-JennyNeural'>
                    ${text}
                </voice>
            </speak>
        `,
    });

    if (!response.ok) {
        throw new Error(`Speech API error: ${response.statusText}`);
    }

    return await response.blob();
}
