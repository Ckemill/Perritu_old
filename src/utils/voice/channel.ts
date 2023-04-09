import { ChatInputCommandInteraction, Message } from "discord.js";

export function getVoiceChannel(interaction?: ChatInputCommandInteraction, message?: Message) {

  const guildId = interaction!.guildId as string || message!.guildId as string;
  const guild = interaction!.client.guilds.cache.get(guildId) || message!.guild;

  const member = guild!.members.cache.get(interaction!.member!.user.id);

  const voiceChannel = member!.voice.channel;

  return voiceChannel!;
};
