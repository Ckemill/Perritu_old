import * as googleTTS from "google-tts-api";
import { GuildMember } from "discord.js";

export function textToSpeech(
  username: string,
  text: string
) {
  return googleTTS.getAudioUrl(`${username} dice. ${text}`, { lang: "es-US" });
}
