import { Client, GatewayIntentBits } from "discord.js";
import { registerEvents } from "../utils";
import events from "../events";
import keys from "../keys";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildEmojisAndStickers,
  ],
});

registerEvents(client, events);

client.login(keys.clientToken).catch((error) => {
  console.log("[Login Error]", error);
  process.exit(1);
});
