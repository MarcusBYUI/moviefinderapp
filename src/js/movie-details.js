import { getUrlParams } from "./utils";
import ExternalServices from "./externalServices";

const movieId = getUrlParams("movie");
const services = new ExternalServices();

const movie = services.returnMovies(services.singleMovieSearch(movieId));

console.log(movie); //Testing single movie response with click on link (movie-listing page link)