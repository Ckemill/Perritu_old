import { event } from "../utils";
import { Queues } from "../types";

export default event(
  "messageReactionAdd",
  async ({ log, client }, messageReaction, user) => {
    console.log(`${user.username} reacted with [${messageReaction.emoji}]`);
    console.log(
      `Guild: ${messageReaction.message.guildId}, Message Id: ${messageReaction.message.id}`
    );
    console.log(Queues.get(messageReaction.message.guildId)?.message?.id);
  }
);
