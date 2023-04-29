import { Guild } from "discord.js";
import { Queues } from "../../../types";

export async function Stop(guild: Guild) {
  let queue = Queues.get(guild.id);
  if (!queue || !queue.player || !queue.message) return;

  try {
    await queue.message.delete();
    queue.player.stop();
    Queues.delete(guild.id);
  } catch (error) {
    console.log(`Stop function... `, error);
  }
}
