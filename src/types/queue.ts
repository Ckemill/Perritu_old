import { AudioPlayer, VoiceConnection } from "@discordjs/voice";
import {
  TextBasedChannel,
  VoiceBasedChannel,
  ChatInputCommandInteraction,
  Message,
} from "discord.js";
import { Song } from "./song";

export interface Queue {
  textChannel?: TextBasedChannel;
  voiceChannel?: VoiceBasedChannel;
  connection?: null | VoiceConnection;
  message?: Message<true>;
  player?: AudioPlayer;
  songs: Song[];
  volume: number;
  playing: boolean;
}

const Queues = new Map<ChatInputCommandInteraction["guildId"], Queue>();

export { Queues };
