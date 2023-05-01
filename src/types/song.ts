import { EmbedAssetData, User } from "discord.js";

export interface Song {
  title: string;
  url: string;
  thumbnail: EmbedAssetData;
  channel: string;
  published: Date;
  requested: User["tag"];
}
