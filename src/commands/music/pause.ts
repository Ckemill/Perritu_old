import { SlashCommandBuilder } from "discord.js";
import { checkVoiceChannel, command, Pause } from "../../utils";

const meta = new SlashCommandBuilder()
  .setName("pause")
  .setDescription("Toggles pause to the current song.");

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

  Pause(interaction.guild!);

  interaction.reply("Music paused/unpaused.");
});
