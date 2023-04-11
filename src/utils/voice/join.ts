import { joinVoiceChannel } from "@discordjs/voice";
import {
  ChatInputCommandInteraction,
  Message,
  VoiceBasedChannel,
  VoiceChannel,
} from "discord.js";

export function joinVoice(
  command: Message | ChatInputCommandInteraction,
  voiceChannel: VoiceBasedChannel
) {
  try {
    joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });
  } catch (error) {
    console.log(error);
    return command.reply(`I couldn't join the voice channel.`);
  }
}
