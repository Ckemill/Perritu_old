import { prefix } from "../../utils";

export default prefix("ping", ({ args, message }) => {
  if (args.length == 0) return message.reply("Pong");

  return message.reply(args);
});
