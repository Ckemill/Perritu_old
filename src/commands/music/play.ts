import { joinVoiceChannel } from "@discordjs/voice";
import { SlashCommandBuilder } from "discord.js";
import { command } from "../../utils";

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
  if (!interaction.member) return;

  const guildId = interaction.guildId as string;
  const guild = interaction.client.guilds.cache.get(guildId);

  if (!guild) return interaction.reply(`You can't use this command here.`);

  const member = guild.members.cache.get(interaction.member.user.id);

  const voiceChannel = member?.voice.channel;

  if (!voiceChannel)
    return interaction.reply({
      ephemeral: true,
      content: "You have to be in a voice channel to use this command.",
    });

  try {
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: guildId,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });
    return interaction.reply({ content: "test" });
  } catch (error) {
    console.log(error);
  }
});
