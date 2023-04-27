import { Readable } from "stream";
import ytdl from "ytdl-core";

export async function YTurl(url: string): Promise<Readable> {
  const stream = ytdl(url, {
    filter: "audioonly",
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  });

  return stream;
}
