import { SlashCommandBuilder } from "discord.js";
import { command, Stop } from "../../utils";

const meta = new SlashCommandBuilder()
  .setName("stop")
  .setDescription("Stops the music and clears the current queue.");

export default command(meta, async ({ interaction }) => {
  Stop(interaction.guild!);

  interaction.reply("Music stopped.");
});
