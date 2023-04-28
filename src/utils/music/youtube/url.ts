import play from "play-dl";
import { YouTubeStream, SoundCloudStream } from "play-dl";

export async function YTurl(url: string): Promise<YouTubeStream | SoundCloudStream> {
  const stream = await play.stream(url);

  return stream;
}
