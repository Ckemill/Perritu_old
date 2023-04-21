import { ChatInputCommandInteraction, VoiceBasedChannel } from "discord.js";

export function checkVoiceChannel(interaction: ChatInputCommandInteraction): VoiceBasedChannel {
    if (!interaction.guild || !interaction.member || !interaction.channel) {
        interaction.reply({
          ephemeral: true,
          content: `You can't use this command here.`,
        });
      }
    
      const guildId = interaction.guildId as string;
      const guild = interaction.client.guilds.cache.get(guildId);
    
      if (!guild) interaction.reply(`You can't use this command here.`);
    
      const member = guild!.members.cache.get(interaction.member!.user.id);
    
      const voiceChannel = member!.voice.channel;

      return voiceChannel!;
}
