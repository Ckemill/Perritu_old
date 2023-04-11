import { Queue, Queues } from "../../types";
import { Snowflake } from "discord.js";

export const queues: Queues = {
  "584746785889583157": { songs: [], playing: false },
};

export function getQueue(guildId: Snowflake): Queue | null {
  const queue = queues[guildId];

  if (!queue) {
    console.log(guildId);
    return null;
  }

  return queue;
}
