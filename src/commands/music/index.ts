import play from "./play";
import stop from "./stop";
import { category } from "../../utils";

export default category("Music", [play, stop], {
  description: "Music commands:",
  emoji: { id: undefined, name: "🎶" },
});
