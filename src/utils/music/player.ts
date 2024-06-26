import {
  createAudioPlayer,
  AudioPlayerStatus,
  createAudioResource,
} from "@discordjs/voice";
import { ChatInputCommandInteraction, TextChannel } from "discord.js";
import { Song, Queues } from "../../types";
import { YTurl, Skip } from "../../utils";
import { EmbedBuilder } from "@discordjs/builders";

export async function play(
  channel: TextChannel,
  guild: ChatInputCommandInteraction["guild"],
  song: Song
) {
  const queue = Queues.get(guild!.id);

  if (!queue || !song) {
    queue!.playing = false;
    await queue!.message?.delete();
    Queues.delete(guild!.id);
    channel.send(`The queue has ended.`);
    console.log(`Queue end.`);
    return;
  }

  const stream = await YTurl(song.url);
  const resource = createAudioResource(stream.stream);
  const player = createAudioPlayer();
  queue?.connection?.subscribe(player);
  player.play(resource);
  queue.player = player;

  const networkStateChangeHandler = (
    oldNetworkState: any,
    newNetworkState: any
  ) => {
    const newUdp = Reflect.get(newNetworkState, "udp");
    clearInterval(newUdp?.keepAliveInterval);
  };

  queue?.connection!.on("stateChange", (oldState, newState) => {
    const oldNetworking = Reflect.get(oldState, "networking");
    const newNetworking = Reflect.get(newState, "networking");

    oldNetworking?.off("stateChange", networkStateChangeHandler);
    newNetworking?.on("stateChange", networkStateChangeHandler);
  });

  player.on(AudioPlayerStatus.Buffering, () => {
    console.log(`buffering`);
  });
  player.on(AudioPlayerStatus.AutoPaused, () => {
    console.log(`Autopaused`);
  });
  player.on(AudioPlayerStatus.Playing, () => {
    console.log(`Playing`);
  });
  player
    .on(AudioPlayerStatus.Idle, () => {
      Skip(guild!);
    })
    .on("error", (error) => console.error(error));

  const embed = new EmbedBuilder()
    .setTitle(song.title)
    .setURL(song.url)
    .setThumbnail(song.thumbnail.url);

  const message = await channel.send({ embeds: [embed] });

  queue.message = message;

  return message
    .react("⏮️")
    .then(() => message.react("⏹️"))
    .then(() => message.react("⏯️"))
    .then(() => message.react("⏭️"))
    .then(() => message.react("🔀"))
    .then(() => message.react("🔁"))
    .catch((error) => console.log("One of the emojis failed to react:", error));
}
