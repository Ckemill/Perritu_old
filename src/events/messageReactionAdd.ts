import { event } from "../utils";

export default event(
  "messageReactionAdd",
  async ({ log, client }, messageReaction, user) => {
    console.log(`${user.username} reacted with [${messageReaction.emoji}]`);
  }
);
