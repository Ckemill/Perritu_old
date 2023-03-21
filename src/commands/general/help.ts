import { getCategoryRoot } from "../../pages/help";
import { SlashCommandBuilder } from "discord.js";
import { command } from "../../utils";

const meta = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Get a list of all commands for perritu.");

export default command(meta, ({ interaction }) => {
  return interaction.reply(getCategoryRoot(true));
});
