import { getUrlParams } from "./utils";
import ExternalServices from "./externalServices";

class DetailsProcess {
  constructor() {
    this.movieId = getUrlParams("movie");
    this.services = new ExternalServices();
  }
  async pullMovie() {
    this.movie = await this.services.returnMovies(
      this.services.moviesSearch(this.movieId, true)
    );
    this.renderMovieDetails();
  }

  renderMovieDetails() {
    document.querySelector(".details-page-image").src = this.movie.Poster;
    document.querySelector(".details-page-image").alt = this.movie.Title;
    document.querySelector(".details-page-title").innerHTML = this.movie.Title;

    document.querySelector(".details-page-year").innerHTML =
      this.movie.Year + " .";
    document.querySelector(".details-page-rating").innerHTML =
      this.movie.Rated + " .";
    document.querySelector(".details-page-genre").innerHTML = this.movie.Genre;
    document.querySelector(
      ".movie-details-description"
    ).innerHTML = this.movie.Plot;
    document.querySelector(".details-page-imdb").innerHTML =
      this.movie.Ratings[0].Value || "N/A";
    document.querySelector(".details-page-tomatoes").innerHTML =
      this.movie.Ratings[1].Value || "N/A";
    document.querySelector(".details-page-metacritic").innerHTML =
      this.movie.Ratings[2].Value || "N/A";
    document.querySelector(
      ".details-page-released"
    ).innerHTML = this.movie.Released;
    document.querySelector(
      ".details-page-runtime"
    ).innerHTML = this.movie.Runtime;
    document.querySelector(".details-page-type").innerHTML = this.movie.Type;
    document.querySelector(
      ".details-page-actors"
    ).innerHTML = this.movie.Actors;
    document.querySelector(
      ".details-page-director"
    ).innerHTML = this.movie.Director;
    document.querySelector(
      ".details-page-writers"
    ).innerHTML = this.movie.Writer;
  }
}

export default DetailsProcess;
