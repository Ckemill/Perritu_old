import { Guild } from "discord.js";
import { Queues } from "../../../types";

export async function Stop(guild: Guild) {
  let queue = Queues.get(guild.id);
  if (!queue || !queue.player) return;

  try {
    await queue.player.stop();
    await queue.message?.delete();
    Queues.delete(guild.id);
  } catch (error) {
    console.log(`Stop function... `, error);
  }
}
