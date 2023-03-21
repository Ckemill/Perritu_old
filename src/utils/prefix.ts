import { Prefix, PrefixCategory, PrefixCategoryExtra, PrefixExec } from "../types";

export function prefix(name: string, exec: PrefixExec): Prefix {
  return {
    name,
    exec,
  };
}

export function prefixCategory(
  name: string,
  commands: Prefix[] | any,
  extra: PrefixCategoryExtra = {
    emoji: {},
  }
): PrefixCategory {
  return {
    name,
    commands,
    ...extra,
  };
}