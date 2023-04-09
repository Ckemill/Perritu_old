import { Guild } from "discord.js";
import { VoiceConnectionStatus, joinVoiceChannel } from "@discordjs/voice";

export interface player {
  guild: Guild;
  player: boolean;
  status: VoiceConnectionStatus;
  connection: string;
}
