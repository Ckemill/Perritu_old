import play from "./play";
import stop from "./stop";
import skip from "./skip";
import pause from "./pause";
import { category } from "../../utils";

export default category("Music", [play, stop, skip, pause], {
  description: "Music commands:",
  emoji: { id: undefined, name: "🎶" },
});
