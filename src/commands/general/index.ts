import { category } from "../../utils";
import help from "./help";
import echo from "./echo";

export default category("General", [help, echo], {
  description: "Usefull commands:",
  emoji: { id: undefined, name: "🆘" },
});
