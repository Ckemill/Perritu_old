import { Event } from "../../types";
import commands from "./commands";
import echo from "./echo";

const events: Event<any>[] = [
    commands,
    echo,
];

export default events;
