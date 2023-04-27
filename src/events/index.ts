import { Event } from "../types";
import ready from "./ready";
import guildCreate from "./guildCreate";
import guildDelete from "./guildDelete";
import messageCreate from "./messageCreate";
import voiceStateUpdate from "./voiceStateUpdate";
import interactionCreate from "./interactionCreate";
import messageReactionAdd from "./messageReactionAdd";
import messageReactionRemove from "./messageReactionRemove";

const events: Event<any>[] = [
  messageReactionRemove,
  ...interactionCreate,
  messageReactionAdd,
  ...messageCreate,
  voiceStateUpdate,
  guildCreate,
  guildDelete,
  ready,
];

export default events;
