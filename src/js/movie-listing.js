// This file is to display a list of movies based on user input
import ExternalServices from "./externalServices";
import {renderMovies, toMovieListing} from "./movie-listingRender";
import { getUrlParams, loadHeaderFooter } from "./utils";

const services = new ExternalServices();


export function renderMovies(userInputString) {
    // Getting API data with "returnMovies"
    const moviesResponse = services.returnMovies(services.moviesSearch(userInputString));
    console.log(moviesResponse);
    // console.log(moviesResponse); //When printing moviesResponse I got a promise.

    // Handling the promise. Extracting data, and creating div elements for each movie
    moviesResponse.then(
        moviesData => {
            const moviesList = moviesData;
            const movies = moviesList.Search;

            for (const movie of movies) {
                //Creating div containers for each movie
                const movieInfo = document.createElement("div");
                const movieChild1 = document.createElement("div");
                const movieChild2 = document.createElement("div")
                

                let movieImg = movie.Poster;

                if (movieImg == "N/A") {
                    movieImg = "https://picsum.photos/300/450";
                }

                movieChild1.innerHTML = `
                <img src="${movieImg}" alt="${movie.Title}">
                `
                movieChild2.innerHTML = `
                <a href="../movie-details?movie=${movie.imdbID}">
                    <h1>${movie.Title}</h1>
                </a>

                <p>Year: ${movie.Year}</p>
                `
                movieInfo.classList.add("movie-short-info");
                movieChild1.classList.add("movieChild1");
                movieChild2.classList.add("movieChild2");
                movieInfo.appendChild(movieChild1)
                movieInfo.appendChild(movieChild2)
                document.querySelector(".movie-list-container").appendChild(movieInfo);
               
            }

            // Down here I'll handle pages
            const numOfResults = +`${moviesList.totalResults}`;
            // const numOfResults = 20;

            if (numOfResults > 10) {
                
                const currentPage = +getUrlParams("page");
                const remainder = numOfResults % 10;
                let numOfPages = numOfResults / 10;

                // Getting actual number of pages if we have movies left (10 movies per page)
                if (remainder > 0) {
                    numOfPages = Math.floor(numOfPages + 1)
                }

                // Rendering page selection based on current page
                if (currentPage == 1) {

                    const pagesDiv = document.createElement("div");
                    const nextButton = document.createElement("button");
                    const nextPage = currentPage + 1;
                    const newUserInput = userInputString.substring(0, userInputString.indexOf("page=") + "page".length + 1);
                    console.log(newUserInput);

                    nextButton.innerHTML = "Next";
                    nextButton.addEventListener("click", 
                        (e) => {
                            e.preventDefault();
                            location.href = `../movie-listing?searching=${newUserInput}${nextPage}`
                        }
                    )
                    
                    pagesDiv.classList.add("page-selection");
                    pagesDiv.innerHTML = `
                    <p>Page ${getUrlParams("page")} of ${numOfPages}</p>
                    `
                    pagesDiv.appendChild(nextButton);

                    document.querySelector(".movie-list-container").appendChild(pagesDiv);

                } else if (currentPage == numOfPages) {

                    const pagesDiv = document.createElement("div");
                    const previousButton = document.createElement("button");
                    const previousPage = currentPage - 1;
                    const newUserInput = userInputString.substring(0, userInputString.indexOf("page=") + "page".length + 1);
                    console.log(newUserInput);

                    previousButton.innerHTML = "Previous";
                    previousButton.addEventListener("click", 
                        (e) => {
                            e.preventDefault();
                            location.href = `../movie-listing?searching=${newUserInput}${previousPage}`
                        }
                    )
                    
                    pagesDiv.classList.add("page-selection");
                    pagesDiv.innerHTML = `
                    <p>Page ${getUrlParams("page")} of ${numOfPages}</p>
                    `
                    pagesDiv.appendChild(previousButton);
                    

                    document.querySelector(".movie-list-container").appendChild(pagesDiv);

                } else {
                    
                    const pagesDiv = document.createElement("div");
                    const previousButton = document.createElement("button");
                    const previousPage = currentPage - 1;
                    const nextButton = document.createElement("button");
                    const nextPage = currentPage + 1;
                    const newUserInput = userInputString.substring(0, userInputString.indexOf("page=") + "page".length + 1);
                    console.log(newUserInput);

                    previousButton.innerHTML = "Previous";
                    previousButton.addEventListener("click", 
                        (e) => {
                            e.preventDefault();
                            location.href = `../movie-listing?searching=${newUserInput}${previousPage}`
                        }
                    )
                    nextButton.innerHTML = "Next";
                    nextButton.addEventListener("click", 
                        (e) => {
                            e.preventDefault();
                            location.href = `../movie-listing?searching=${newUserInput}${nextPage}`
                        }
                    )
                    
                    pagesDiv.classList.add("page-selection");
                    pagesDiv.innerHTML = `
                    <p>Page ${getUrlParams("page")} of ${numOfPages}</p>
                    `
                    pagesDiv.appendChild(previousButton);
                    pagesDiv.appendChild(nextButton);
                    

                    document.querySelector(".movie-list-container").appendChild(pagesDiv);

                }
            }
        }
    )
}

export function toMovieListing (event, page=1) {
    // This function will take the user to movie-listing page with search input in the URL
    event.preventDefault();
    const userInput = document.querySelector("#user-input").value;
    const newUserInput = userInput.replace(/\s/g, "+");

    location.href = `../movie-listing?searching=${newUserInput}&page=${page}`
}

// Getting button and adding event listener
const inputButton = document.querySelector(".btn_search");

inputButton.addEventListener("click", 
    (e) => {
        toMovieListing(e);
    }
)

loadHeaderFooter()
//Exposing search function to html
window.toMovieListing = toMovieListing;


// Redering movies based on URL
if (getUrlParams("searching") !== null) {
    const userSearch = getUrlParams("searching");
    const userPage = getUrlParams("page");
    
    renderMovies(`${userSearch}&page=${userPage}`, services);
}