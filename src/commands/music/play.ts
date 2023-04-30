import {
  play,
  command,
  YTsearch,
  joinVoice,
  checkVoiceChannel,
} from "../../utils";
import { ChannelType, SlashCommandBuilder } from "discord.js";
import { Queue, Queues } from "../../types";

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

  if (interaction.channel?.type != ChannelType.GuildText) {
    return interaction.reply({
      ephemeral: true,
      content: `You can't use this command here.`,
    });
  }

  const url = interaction.options.getString("song");

  if (!url)
    return interaction.reply(`You have to let me know what song to search...`);

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
