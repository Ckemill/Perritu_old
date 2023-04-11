import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
} from "@discordjs/voice";
import { command, getQueue, joinVoice } from "../../utils";
import { SlashCommandBuilder } from "discord.js";
import ytdl from "ytdl-core";
import { Song } from "../../types";

const meta = new SlashCommandBuilder()
  .setName("play")
  .setDescription("Plays a requested song.")
  .addStringOption((option) =>
    option
      .setName("song")
      .setDescription("Provide the song name you want to search and reproduce.")
      .setMinLength(1)
      .setMaxLength(2000)
      .setRequired(false)
  );

export default command(meta, async ({ interaction }) => {
  if (!interaction.guild || !interaction.member || !interaction.channel) {
    return interaction.reply({
      ephemeral: true,
      content: `You can't use this command here.`,
    });
  }

  const guildId = interaction.guildId as string;
  const guild = interaction.client.guilds.cache.get(guildId);

  if (!guild) return interaction.reply(`You can't use this command here.`);

  const member = guild.members.cache.get(interaction.member.user.id);

  const voiceChannel = member?.voice.channel;

  if (!voiceChannel) {
    return interaction.reply({
      ephemeral: true,
      content: "You have to be in a voice channel to use this command.",
    });
  }

  let queue = getQueue(interaction.guildId as string);

  const song: Song = {
    title: "test",
    url: interaction.options.getString("song")!,
    author: "test",
    thumbnail: "test",
    requester: interaction.user.id,
  };

  const connection = joinVoice(voiceChannel);

  queue?.songs.push(song);

  if (queue?.playing) {
    return interaction.reply(`Added "${song.title}" to the queue.`);
  }

  queue!.playing = true;

  const player = createAudioPlayer();

  const playSong = async (song: { title: string; url: string }) => {
    const stream = await ytdl(song.url, { filter: "audioonly" });
    const resource = createAudioResource(stream);
    player.play(resource);

    player.on(AudioPlayerStatus.Idle, () => {
      queue?.songs.shift();

      if (queue!.songs.length > 0) {
        playSong(queue!.songs[0]);
      } else {
        queue!.playing = false;
        connection.destroy();
      }
    });

    player.on("error", (error) => {
      console.error(error);
    });

    interaction.reply(`Playing "${song.title}"`);
  };

  playSong(song);

  connection.subscribe(player);
});
