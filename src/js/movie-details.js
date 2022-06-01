import { loadHeaderFooter, changeHeaderPath } from "./utils";
import { toMovieListing } from "./movie-listingRender";
import DetailsProcess from "./movie-detailsProcess";

loadHeaderFooter();

window.toMovieListing = toMovieListing;

const processDetails = new DetailsProcess();
processDetails.pullMovie();

// Change Homepage Icon and source paths
setTimeout(changeHeaderPath, 500);
