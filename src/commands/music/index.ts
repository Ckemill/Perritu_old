import { category } from "../../utils";
import play from "./play";

export default category("Music", [play], {
  description: "Music commands:",
  emoji: { id: undefined, name: "🎶" },
});
