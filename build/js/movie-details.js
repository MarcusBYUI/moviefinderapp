import { loadHeaderFooter as o, changeHeaderPath as e } from "./utils.js";
import { toMovieListing as i } from "./movie-listingRender.js";
import s from "./movie-detailsProcess.js";
o(), (window.toMovieListing = i);
const t = new s();
t.pullMovie();
const a = setTimeout(e, 500);
