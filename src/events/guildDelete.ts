import { Guild } from "discord.js";
import { event } from "../utils";

export default event("guildDelete", async ({ log, client }, guild: Guild) => {
  console.log(`perritu removed from guild [${guild}]`);
});
