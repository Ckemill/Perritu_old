import { Client } from "discord.js";
import express from "express";

export function startApi(client: Client) {
  const app = express();
  app.use(express.json());

  const PORT = 5042;

  app.get("/guildCount", (req, res) => {
    res.send(`${client.guilds.cache.size}`);
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
