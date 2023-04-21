import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import {
  command,
  textToSpeech,
  joinVoice,
  checkVoiceChannel,
  play,
} from "../../utils";

const meta = new SlashCommandBuilder()
  .setName("echo")
  .setDescription("I'll say in voice whatever you type.");

export default command(meta, ({ interaction }) => {
  const voiceChannel = checkVoiceChannel(interaction);

  if (!voiceChannel) {
    return interaction.reply({
      ephemeral: true,
      content: "You have to be in a voice channel to use this command.",
    });
  }

  const connection = joinVoice(voiceChannel);

  if (!interaction.guild || !interaction.member || !interaction.channel) {
    return interaction.reply({
      ephemeral: true,
      content: `You can't use this command here.`,
    });
  }

  if (interaction.channel!.type != 0) {
    return interaction.reply({
      ephemeral: true,
      content: `I can't read messages on this channel.`,
    });
  }

  let collector = interaction.channel.createMessageCollector({
    filter: (message) => message.author.id === interaction.user.id,
    time: 300000,
  });

  collector.on("collect", (message) => {
    const stream = textToSpeech(message.member!.nickname || message.member!.displayName, message.content);
    console.log();
    play(stream, connection);
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
