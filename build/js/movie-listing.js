import o from "./externalServices.js";
import {
  toMovieListing as s,
  renderMovies as t,
} from "./movie-listingRender.js";
import {
  getUrlParams as e,
  loadHeaderFooter as n,
  changeHeaderPath as a,
} from "./utils.js";
const c = new o();
if ((n(), (window.toMovieListing = s), e("searching") !== null)) {
  const r = e("searching"),
    i = e("page");
  t(`${r}&page=${i}`, c);
}
const v = setTimeout(a, 250);
