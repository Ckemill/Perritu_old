import { Keys } from "../types";

const keys: Keys = {
  clientToken: process.env.BOT_TOKEN ?? "nil",
  testGuild: process.env.TEST_GUILD ?? "nil",
  youtubeApiKey: process.env.YT_API_KEY ?? "nil",
  spotifyClient: process.env.SPOTIFY_CLIENT ?? "nil",
  spotifySecret: process.env.SPOTIFY_SECRET ?? "nil",
};

if (Object.values(keys).includes("nil"))
  throw new Error("Not all ENV variables are defined!");

export default keys;
