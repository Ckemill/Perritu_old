import { joinVoiceChannel, VoiceConnection } from "@discordjs/voice";
import { VoiceBasedChannel } from "discord.js";

export function joinVoice(voiceChannel: VoiceBasedChannel): VoiceConnection {
  return joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });
}
