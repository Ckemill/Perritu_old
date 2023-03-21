import { Event } from "../types";
import ready from "./ready";
import messageCreate from "./messageCreate";
import interactionCreate from "./interactionCreate";

const events: Event<any>[] = [
    ...interactionCreate,
    ...messageCreate,
    ready,
];

export default events;
