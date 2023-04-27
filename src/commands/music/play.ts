import {
  play,
  command,
  joinVoice,
  checkVoiceChannel,
  YTsearch,
} from "../../utils";
import { SlashCommandBuilder } from "discord.js";
import { Song, Queue, Queues } from "../../types";

const meta = new SlashCommandBuilder()
  .setName("play")
  .setDescription("Plays a requested song.")
  .addStringOption((option) =>
    option
      .setName("song")
      .setDescription("Provide the song name you want to search and play.")
      .setMinLength(1)
      .setMaxLength(2000)
      .setRequired(false)
  );

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

  const url = interaction.options.getString("song");

  if (!url) return interaction.reply(`you have to provide an url.`);

  const song = await YTsearch(url);

  let queue = Queues.get(interaction.guildId);

  if (!queue) {
    const queueConstruct: Queue = {
      textChannel: interaction.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    };

    queueConstruct.songs.push(song);
    Queues.set(interaction.guildId, queueConstruct);

    try {
      const connection = joinVoice(voiceChannel);
      queueConstruct.connection = connection;
      play(interaction.channel, interaction.guild, queueConstruct.songs[0]);
      interaction.deferReply();
      interaction.deleteReply();
    } catch (error) {
      console.log(`Could not join voice channel: ${error}`);
      Queues.delete(interaction.guildId);
      return interaction.reply(`Could not join voice channel.`);
    }
  } else {
    queue.songs.push(song);
    return interaction.reply(`Song added to the queue.`);
  }
});
