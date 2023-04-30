import { Queue, Queues } from "../../types";
import {
  play,
  prefix,
  YTsearch,
  joinVoice,
  checkVoiceChannel,
} from "../../utils";
import { ChannelType } from "discord.js";

export default prefix("play", async ({ args, message }) => {
  const voiceChannel = checkVoiceChannel(message);

  if (!voiceChannel)
    return message.reply(
      `You have to be in a voice channel to use this command.`
    );

  if (message.channel.type != ChannelType.GuildText)
    return message.reply(`You can't use this command here.`);

  if (!args)
    return message.reply(`You have to let me know what song to search...`);

  const song = await YTsearch(args);

  let queue = Queues.get(message.guildId);

  if (!queue) {
    const queueConstruct: Queue = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    };

    queueConstruct.songs.push(song);
    Queues.set(message.guildId, queueConstruct);

    try {
      const connection = joinVoice(voiceChannel);
      queueConstruct.connection = connection;
      play(message.channel, message.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.log(`Could not joind voice channel: ${error}`);
      Queues.delete(message.guildId);
      return message.reply(`Could not join voice channel.`);
    }
  } else {
    queue.songs.push(song);
    return message.reply(`Song added to the queue`);
  }
});
