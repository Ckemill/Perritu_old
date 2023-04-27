import { Guild, TextChannel } from "discord.js";
import { Queues } from "../../../types";
import { play } from "../../../utils";

export async function Skip(guild: Guild) {
  let queue = Queues.get(guild.id);
  if (!queue || !queue.player) return;

  try {
    await queue.player.stop();
    await queue.message?.delete();
    await queue.songs.shift();
    play(queue.textChannel as TextChannel, guild, queue.songs[0]);
  } catch (error) {
    console.log(`Stop function... `, error);
  }
}
