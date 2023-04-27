import { Guild } from "discord.js";
import { Queues } from "../../../types";

export function Stop(guild: Guild) {
  let queue = Queues.get(guild.id);
  if (!queue || !queue.player) return;

  queue.player.stop();
  queue.message?.delete();
}
