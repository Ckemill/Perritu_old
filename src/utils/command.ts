import {
  Command,
  CommandCategory,
  CommandCategoryExtra,
  CommandExec,
  CommandMeta,
} from "../types";

export function command(meta: CommandMeta, exec: CommandExec): Command {
  return {
    meta,
    exec,
  };
}

export function category(
  name: string,
  commands: Command[] | any,
  extra: CommandCategoryExtra = {
    emoji: {},
  }
): CommandCategory {
  return {
    name,
    commands,
    ...extra,
  };
}
