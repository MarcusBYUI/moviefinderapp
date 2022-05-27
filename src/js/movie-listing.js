// This file is to display a list of movies based on user input
import ExternalServices from "./externalServices";
import { getUrlParams } from "./utils";

const services = new ExternalServices();

export function renderMovies(userInputString) {
    // Getting API data with "returnMovies"
    const moviesResponse = services.returnMovies(services.moviesSearch(userInputString));
    // console.log(moviesResponse); //When printing moviesResponse I got a promise.

    // Handling the promise. Extracting data, and creating div elements for each movie
    moviesResponse.then(
        moviesData => {
            const moviesList = moviesData;
            const movies = moviesList.Search;

            for (const movie of movies) {
                //Creating div containers for each movie
                const movieInfo = document.createElement("div");
                movieInfo.classList.add = "movie-short-info";

                let movieImg = movie.Poster;

                if (movieImg == "N/A") {
                    movieImg = "https://picsum.photos/300/450";
                }

                movieInfo.innerHTML = `
                <img src="${movieImg}" alt="${movie.Title}">
          
                <a href="../movie-details?movie=${movie.imdbID}">
                    <h1>${movie.Title}</h1>
                </a>

                <p>Year: ${movie.Year}</p>
                `
        
                document.querySelector(".movie-list-container").appendChild(movieInfo);
            }
        }
    )
}

export function toMovieListing (event) {
    // This function will take the user to movie-listing page with search input in the URL
    event.preventDefault();
    const userInput = document.querySelector("#user-input").value;
    const newUserInput = userInput.replace(/\s/g, "+");

    location.href = `../movie-listing?searching=${newUserInput}`
}

const inputButton = document.querySelector(".btn_search");

inputButton.addEventListener("click", 
    (e) => {
        toMovieListing(e);
    }
)

if (getUrlParams("searching") !== null) {
    renderMovies(getUrlParams("searching"));
}