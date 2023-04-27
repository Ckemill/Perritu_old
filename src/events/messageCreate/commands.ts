import commands from "../../prefix";
import { event } from "../../utils";
import { Prefix } from "../../types";
import { Message } from "discord.js";

const allCommands = commands.map(({ commands }) => commands).flat();
const allCommandsMap = new Map<string, Prefix>(
  allCommands.map((c) => [c.name, c])
);

export default event(
  "messageCreate",
  async ({ log, client }, message: Message) => {
    if (!message.content.startsWith("_")) return;

    const args = message.content.slice(1).split(" ").slice(1).join(" ");

    try {
      const commandName = message.content.split(" ")[0].slice(1);
      const command = allCommandsMap.get(commandName);

      if (!command) {
        return message.reply(`Command not found...`);
      }

      console.log(
        `${message.author.username} used ${commandName} message command.`
      );

      await command.exec({
        client,
        args,
        message,
        log(...args) {
          log(`[${command.name}]`, ...args);
        },
      });
    } catch (error) {
      log(`[Command Error]`, error);

      return message.reply("Something went wrong :(");
    }
  }
);
