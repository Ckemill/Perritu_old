import { google } from "googleapis";
import keys from "../../../keys";
import { Song } from "../../../types";

const auth = keys.youtubeApiKey;

const youtube = google.youtube({ version: "v3", auth: auth });

export async function YTsearch(query: string): Promise<Song> {
  const results = await youtube.search.list({
    part: ["id", "snippet"],
    q: query,
    maxResults: 1,
    type: ["video"],
  });

  const video = results.data.items![0];

  console.log(video);

  const info: Song = {
    title: video.snippet!.title!,
    channel: video.snippet!.channelTitle!,
    thumbnail: video.snippet!.thumbnails!.high,
    published: new Date(video.snippet!.publishedAt!),
    url: `https://www.youtube.com/watch?v=${video.id!.videoId}`,
  };

  return info;
}
