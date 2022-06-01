// This file is to display a list of movies based on user input
import ExternalServices from "./externalServices";
import { toMovieListing, renderMovies } from "./movie-listingRender";
import { getUrlParams, loadHeaderFooter } from "./utils";

const services = new ExternalServices();


loadHeaderFooter()
//Exposing search function to html
window.toMovieListing = toMovieListing;


// Redering movies based on URL
if (getUrlParams("searching") !== null) {
    const userSearch = getUrlParams("searching");
    const userPage = getUrlParams("page");
    
    renderMovies(`${userSearch}&page=${userPage}`, services);
}