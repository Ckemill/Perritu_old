import {
  play,
  YTurl,
  command,
  getQueue,
  joinVoice,
  checkVoiceChannel,
} from "../../utils";
import { SlashCommandBuilder } from "discord.js";
import fs from "fs";
import { Song } from "../../types";

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

  const connection = joinVoice(voiceChannel);

  const url = interaction.options.getString("song");

  if (!url) return interaction.reply(`you have to provide an url.`);

  const stream = YTurl(url);

  const embed = await play(stream, connection);

  interaction.reply({ embeds: [embed] });
});
