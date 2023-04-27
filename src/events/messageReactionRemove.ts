import { event } from "../utils";

export default event(
  "messageReactionRemove",
  async ({ log, client }, messageReaction, user) => {
    console.log(`${user.username} removed [${messageReaction.emoji}] reaction`);
  }
);
