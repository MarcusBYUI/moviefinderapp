import { loadHeaderFooter } from "./utils";
import { toMovieListing } from "./movie-listingRender";
import DetailsProcess from "./movie-detailsProcess";

loadHeaderFooter();

window.toMovieListing = toMovieListing;

const processDetails = new DetailsProcess();
processDetails.pullMovie();
