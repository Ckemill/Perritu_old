import commands from "../../prefix";
import { event } from "../../utils";
import { Prefix } from "../../types";
import { Message } from "discord.js";

const allCommands = commands.map(({ commands }) => commands).flat();
const allCommandsMap = new Map<string, Prefix>(
  allCommands.map((c) => [c.name, c])
);

export default event("messageCreate", async ({ log, client }, message: Message) => {
  console.log(message.content);
});
