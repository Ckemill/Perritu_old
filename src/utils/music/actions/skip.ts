import { Guild, TextChannel } from "discord.js";
import { Queues } from "../../../types";
import { play } from "../../../utils";

export async function Skip(guild: Guild) {
  let queue = Queues.get(guild.id);
  if (!queue || !queue.player || !queue.message) return;

  try {
    await queue.message.delete();
    queue.player.stop();
    queue.message = undefined;
    queue.songs.shift();
    play(queue.textChannel as TextChannel, guild, queue.songs[0]);
  } catch (error) {
    console.log(`Stop function... `, error);
  }
}
