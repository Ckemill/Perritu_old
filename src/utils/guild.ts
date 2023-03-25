import { Guild } from "discord.js";

export function isComunity(guild: Guild) {
  return guild.features?.includes("COMMUNITY");
}
