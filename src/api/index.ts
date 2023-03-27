import bodyParser from "body-parser";
import { Client } from "discord.js";
import jwt from "jsonwebtoken";
import express from "express";
const cors = require("cors");

export function startApi(client: Client) {
  const app = express();
  app.use(cors());

  app.use(bodyParser.json());

  const secret = "my-secret-token";

  const PORT = 5042;

  app.use("/api/protected", (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token)
      return res.status(401).json({ message: "Unauthorized" });

    try {
      const payload = jwt.verify(token, secret);

      console.log(payload);

      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  });

  app.get("/guilds", (req, res) => {
    res.status(200).json({ guildsCount: client.guilds.cache.size });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
