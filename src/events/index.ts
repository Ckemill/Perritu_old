import { Event } from "../types";
import ready from "./ready";
import guildCreate from "./guildCreate";
import guildDelete from "./guildDelete";
import messageCreate from "./messageCreate";
import interactionCreate from "./interactionCreate";

const events: Event<any>[] = [
  ...interactionCreate,
  ...messageCreate,
  guildCreate,
  guildDelete,
  ready,
];

export default events;
