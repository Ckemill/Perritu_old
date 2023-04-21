import {
  VoiceConnection,
  createAudioPlayer,
  AudioPlayerStatus,
  createAudioResource,
} from "@discordjs/voice";
import internal from "stream";
import { EmbedBuilder } from "@discordjs/builders";
import { get } from "http";

export async function play(
  stream: internal.Readable,
  connection: VoiceConnection
): Promise<EmbedBuilder> {
  const resource = createAudioResource(stream);
  const player = createAudioPlayer();
  player.play(resource);

  connection.subscribe(player);

  const networkStateChangeHandler = (
    oldNetworkState: any,
    newNetworkState: any
  ) => {
    const newUdp = Reflect.get(newNetworkState, "udp");
    clearInterval(newUdp?.keepAliveInterval);
  };

  connection.on("stateChange", (oldState, newState) => {
    const oldNetworking = Reflect.get(oldState, "networking");
    const newNetworking = Reflect.get(newState, "networking");

    oldNetworking?.off("stateChange", networkStateChangeHandler);
    newNetworking?.on("stateChange", networkStateChangeHandler);
  });

  function embed(): Promise<EmbedBuilder> {
    const embed = new EmbedBuilder();
    return new Promise((resolve) => {
      player.on(AudioPlayerStatus.Playing, () => {
        embed.setTitle("Hola");
        resolve(embed);
      });
    });
  }

  return embed();
}
