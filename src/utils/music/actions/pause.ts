import { Guild } from "discord.js";
import { Queues } from "../../../types";
import { AudioPlayerStatus } from "@discordjs/voice";

export async function Pause(guild: Guild) {
  let queue = Queues.get(guild.id);
  if (!queue || !queue.player) return;

  try {
    if (queue.player.state.status === AudioPlayerStatus.Paused) {
      queue.player.pause();
    } else {
      queue.player.unpause();
    }
  } catch (error) {
    console.log(`Paused function... `, error);
  }
}
