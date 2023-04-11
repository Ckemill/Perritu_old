import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { command, textToSpeech, joinVoice } from "../../utils";

const meta = new SlashCommandBuilder()
  .setName("echo")
  .setDescription("I'll say in voice whatever you type.");

export default command(meta, ({ interaction }) => {
  if (!interaction.guild || !interaction.member || !interaction.channel) {
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

  const member = interaction.guild.members.cache.get(
    interaction.member.user.id
  );

  if (!member)
    return interaction.reply({
      ephemeral: true,
      content: `You can't use this command here..`,
    });

  const voiceChannel = member.voice.channel;

  if (!voiceChannel)
    return interaction.reply({
      ephemeral: true,
      content: `You have to be in a voice channel to use this command.`,
    });

  joinVoice(interaction, voiceChannel);

  let collector = interaction.channel.createMessageCollector({
    filter: (message) => message.author.id === interaction.user.id,
    time: 300000,
  });

  collector.on("collect", (message) => {
    console.log(textToSpeech(message.content));
    collector.resetTimer();
  });

  collector.on("end", () => {
    interaction.followUp({
      ephemeral: true,
      content: `Since you haven't type in 5 minutes, I'll stop saying what you type.`,
    });
  });

  return interaction.reply({
    ephemeral: true,
    content: `Now I'll say everything you type.`,
  });
});
