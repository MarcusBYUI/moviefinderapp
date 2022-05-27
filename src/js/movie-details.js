import { loadHeaderFooter } from "./utils";
import DetailsProcess from "./movie-detailsProcess";

loadHeaderFooter();

const processDetails = new DetailsProcess();
processDetails.pullMovie();
