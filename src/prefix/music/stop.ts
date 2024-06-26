import { prefix, checkVoiceChannel, Stop } from "../../utils";
import { ChannelType } from "discord.js";

export default prefix("stop", async ({ args, message }) => {
  const voiceChannel = checkVoiceChannel(message);

  if (!voiceChannel)
    return message.reply(
      `You have to be in a voice channel to use this command.`
    );

  if (message.channel.type != ChannelType.GuildText)
    return message.reply(`You can't use this command here.`);

  Stop(message.guild!);

  message.reply(`Stopped the music.`);
});
