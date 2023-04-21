import ytdl from "ytdl-core";

export function YTurl(url: string) {
  const stream = ytdl(url, {
    filter: "audioonly",
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  });

  return stream;
}
