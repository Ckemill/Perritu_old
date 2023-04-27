import { Skip, prefix, checkVoiceChannel } from "../../utils";
import { ChannelType } from "discord.js";

export default prefix("stop", async ({ args, message }) => {
  const voiceChannel = checkVoiceChannel(message);

  if (!voiceChannel)
    return message.reply(
      `You have to be in a voice channel to use this command.`
    );

  if (message.channel.type != ChannelType.GuildText)
    return message.reply(`You can't use this command here.`);

  Skip(message.guild!);

  message.reply(`Skipped to the next song`);
});
