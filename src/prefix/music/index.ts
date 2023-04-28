import { prefixCategory } from "../../utils";
import play from "./play";
import skip from "./skip";
import stop from "./stop";
import pause from "./pause";

export default prefixCategory("Music", [play, skip, pause, stop]);
