import {
  Client,
  Awaitable,
  SlashCommandBuilder,
  APIMessageComponentEmoji,
  ChatInputCommandInteraction,
} from "discord.js";

type LoggerFunction = (...args: unknown[]) => void;

export interface CommandProps {
  interaction: ChatInputCommandInteraction;
  client: Client;
  log: LoggerFunction;
}

export type CommandExec = (props: CommandProps) => Awaitable<unknown>;

export type CommandMeta =
  | SlashCommandBuilder
  | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

export interface Command {
  meta: CommandMeta;
  exec: CommandExec;
}

export interface CommandCategoryExtra {
  description?: string;
  emoji: APIMessageComponentEmoji;
}

export interface CommandCategory extends CommandCategoryExtra {
  name: string;
  commands: Command[];
}
