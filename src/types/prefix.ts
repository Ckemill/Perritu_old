import {
  APIMessageComponentEmoji,
  Awaitable,
  Client,
  Message,
} from "discord.js";

type LoggerFunction = (...args: unknown[]) => void;

export interface PrefixProps {
  message: Message;
  args: string;
  client: Client;
  log: LoggerFunction;
}

export type PrefixExec = (props: PrefixProps) => Awaitable<unknown>;

export interface Prefix {
  name: string;
  exec: PrefixExec;
}

export interface PrefixCategoryExtra {
  description?: string;
  emoji: APIMessageComponentEmoji;
}

export interface PrefixCategory extends PrefixCategoryExtra {
  name: string;
  commands: Prefix[];
}
