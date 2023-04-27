import play from "./play";
import stop from "./stop";
import skip from "./skip";
import { category } from "../../utils";

export default category("Music", [play, stop, skip], {
  description: "Music commands:",
  emoji: { id: undefined, name: "🎶" },
});
