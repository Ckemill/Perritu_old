import { Guild } from "discord.js";
import { Queues } from "../../../types";
import { AudioPlayerStatus } from "@discordjs/voice";

export async function Pause(guild: Guild) {
  let queue = Queues.get(guild.id);
  if (!queue || !queue.player) return;

  const player = queue.player;

  try {
    if (queue.player.state.status === AudioPlayerStatus.Paused) {
      player.unpause();
    } else {
      player.pause();
    }
  } catch (error) {
    console.log(`Paused function... `, error);
  }
}
