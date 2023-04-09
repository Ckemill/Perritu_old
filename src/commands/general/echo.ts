import { SlashCommandBuilder } from "discord.js";
import { command, joinVoice, getVoiceChannel, textToSpeech } from "../../utils";

const meta = new SlashCommandBuilder()
  .setName("echo")
  .setDescription("I'll say in voice whatever you type.");

export default command(meta, ({ interaction }) => {
  if (!interaction.channel) return;

  if (interaction.channel.type != 0) {
    return interaction.reply({
      ephemeral: true,
      content: `I can't read your messages here.`,
    });
  }

  const collector = interaction.channel.createMessageCollector({
    filter: (msg) => msg.author.id === interaction.user.id,
  });

  joinVoice(getVoiceChannel(interaction));

  collector.on("collect", (msg) => {});

  collector.on("end", () => {
    interaction.reply(`Now I'll stop saying what you type.`);
  });

  return interaction.reply(`Now I'll say everything you type.`);
});
