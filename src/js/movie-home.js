import ExternalServices from "./externalServices";
import { loadHeaderFooter } from "./utils";
import { toMovieListing } from "./movie-listingRender";

loadHeaderFooter();

// Exposing search funtion to html
window.toMovieListing = toMovieListing;
