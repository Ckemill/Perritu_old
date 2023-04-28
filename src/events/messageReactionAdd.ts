import { event, Stop, Skip, Pause } from "../utils";
import { Queues } from "../types";

export default event(
  "messageReactionAdd",
  async ({ log, client }, messageReaction, user) => {
    const guild = messageReaction.message.guild;
    const messageId = messageReaction.message.id;
    const emoji = messageReaction.emoji.name;

    if (!guild) return;

    const queue = Queues.get(guild.id);

    if (!queue || !queue.message || user.bot) return;

    if (queue.message.id === messageId) {
      switch (emoji) {
        case "⏮️":
          //Stop(guild);

          queue.textChannel?.send(`This action haven't been implemented yet`);
          console.log(`${user.username} previous track reacting.`);
          break;
        case "⏹️":
          Stop(guild);

          console.log(`${user.username} stoped the music reacting.`);
          break;
        case "⏯️":
          Pause(guild);

          console.log(`${user.username} play/paused music reacting.`);
          break;
        case "⏭️":
          Skip(guild);

          console.log(`${user.username} next song reacting.`);
          break;
        case "🔀":
          //Stop(guild);

          queue.textChannel?.send(`This action haven't been implemented yet`);
          console.log(`${user.username} shuffle music reacting.`);
          break;
        case "🔁":
          //Stop(guild);

          queue.textChannel?.send(`This action haven't been implemented yet`);
          console.log(`${user.username} repeat music reacting.`);
          break;
        case "🔂":
          //Stop(guild);

          queue.textChannel?.send(`This action haven't been implemented yet`);
          console.log(`${user.username} repeat music reacting.`);
          break;
        default:
          break;
      }
    }
  }
);
