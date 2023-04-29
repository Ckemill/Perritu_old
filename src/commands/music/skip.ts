import { SlashCommandBuilder } from "discord.js";
import { checkVoiceChannel, command, Skip } from "../../utils";

const meta = new SlashCommandBuilder()
  .setName("skip")
  .setDescription("Skips to the next song in queue if any.");

export default command(meta, async ({ interaction }) => {
  const voiceChannel = checkVoiceChannel(interaction);

  if (!voiceChannel) {
    return interaction.reply({
      ephemeral: true,
      content: "You have to be in a voice channel to use this command.",
    });
  }

  if (!interaction.channel) {
    return interaction.reply({
      ephemeral: true,
      content: `You can't use this command here.`,
    });
  }

  if (interaction.channel.type != 0) {
    return interaction.reply({
      ephemeral: true,
      content: `I can't read messages on this channel.`,
    });
  }

  Skip(interaction.guild!);

  interaction.reply("Skipped to the next song.");
});
