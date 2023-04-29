import play, { YouTubeStream, SoundCloudStream } from "play-dl";
import { Readable } from "stream";
import ytdl from "ytdl-core";

export async function YTurl(url: string): Promise<Readable> {
  //const stream = await play.stream(url, { discordPlayerCompatibility: true, });
  const stream = ytdl(url, {
    filter: "audioonly",
    quality: "lowestaudio",
    highWaterMark: 1 << 25,
  });

  return stream;
}
