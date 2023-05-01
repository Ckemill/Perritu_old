import { prefix } from "../../utils";
import { getCategoryRoot } from "../../pages/help";

export default prefix("help", ({ args, message }) => {
  if (args.length == 0) return message.reply("Pong");

  return message.reply(
    `Please use **/help** or go to https://perritu.com for more info.`
  );
});
