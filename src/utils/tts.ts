import * as googleTTS from "google-tts-api";

export function textToSpeech(text: string) {
  return googleTTS.getAudioUrl(text, { lang: "es-US" });
}
