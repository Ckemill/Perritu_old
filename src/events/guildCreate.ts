import { Guild } from "discord.js";
import { event, isComunity } from "../utils";

export default event("guildCreate", async ({ log, client }, guild: Guild) => {
  console.log(`Perritu added to guild [${guild}]`);
});
