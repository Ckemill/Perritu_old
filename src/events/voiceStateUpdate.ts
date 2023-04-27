import { event } from "../utils";
import { Queues } from "../types";
import { VoiceState } from "discord.js";

export default event(
  "voiceStateUpdate",
  async ({ log, client }, oldState: VoiceState, newState: VoiceState) => {
    const voiceChannel = oldState.channel || newState.channel;
    const guildId = oldState.guild.id || newState.guild.id;

    const queue = Queues.get(guildId);

    if (voiceChannel && voiceChannel.members.size === 1) {
      setTimeout(() => {
        if (voiceChannel.members.size === 1) {
          if (!queue?.playing) {
            queue?.connection?.destroy();
            queue?.textChannel?.send("I leave because I was alone :(");
            Queues.delete(guildId);
          }
        }
      }, 10 * 60 * 1000);
    }
  }
);
