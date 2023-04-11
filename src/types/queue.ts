import { VoiceConnection } from "@discordjs/voice";
import { TextBasedChannel, VoiceChannel } from "discord.js";
import { Song } from "./song";

export type Queue = {
  songs: Song[];
  textChannel: TextBasedChannel;
  voiceChannel: VoiceChannel;
  connection: VoiceConnection;
  volume: number;
  playing: boolean;
};

export type Queues = {
  [key: string]: Queue;
};
