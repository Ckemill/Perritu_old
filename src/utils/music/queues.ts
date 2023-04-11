import { Queue, Queues } from "../../types";
import { Snowflake } from "discord.js";

export const queues: Queues = {};

export function getQueue(guildId: Snowflake): Queue | null {
  const queue = queues[guildId];

  if (!queue) {
    return null;
  }

  return queue;
}
