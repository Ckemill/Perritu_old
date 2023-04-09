import { joinVoiceChannel } from "@discordjs/voice";
import { channel } from "diagnostics_channel";
import { VoiceBasedChannel, VoiceChannel } from "discord.js";

export function joinVoice(voiceChannel: VoiceBasedChannel) {
  console.log(voiceChannel);
  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });
}
