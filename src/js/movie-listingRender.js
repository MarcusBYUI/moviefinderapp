import { getUrlParams } from "./utils";

export function renderMovies(userInputString, services) {
    // Getting API data with "returnMovies"
    const moviesResponse = services.returnMovies(services.moviesSearch(userInputString));

    // console.log(moviesResponse); //When printing moviesResponse I got a promise.

    // Handling the promise. Extracting data, and creating div elements for each movie
    moviesResponse.then(
        moviesData => {
            const moviesList = moviesData;
            const movies = moviesList.Search;

            if (moviesList.Error == "Too many results.") {
                
                document.querySelector(".movie-list-container").innerHTML = `
                    <h1>Oops!!</h1>
                    <p>Something went wrong</p>
                    <p>${moviesList.Error} Try seaching with more specific words.</p>
                    `;

            } else if (moviesList.Error == "Movie not found!") {

                document.querySelector(".movie-list-container").innerHTML = `
                    <h1>Oops!!</h1>
                    <p>Something went wrong</p>
                    <p>${moviesList.Error}</p>
                    `;
            }

            // Looping through movies to render them on html
            for (const movie of movies) {
                //Creating div containers for each movie
                const movieInfo = document.createElement("div");
                

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
                movieInfo.classList.add("movie-short-info");
                document.querySelector(".movie-list-container").appendChild(movieInfo);
            }

            // Down here I'll handle pages
            const numOfResults = +`${moviesList.totalResults}`;

            if (numOfResults > 10) {
                
                const currentPage = +getUrlParams("page");
                const remainder = numOfResults % 10;
                let numOfPages = numOfResults / 10;

                // Getting actual number of pages if we have movies left (10 movies per page)
                if (remainder > 0) {
                    numOfPages = Math.floor(numOfPages + 1)
                }

                let pagesDiv = document.createElement("div");
                let previousButton = document.createElement("button");
                let previousPage = currentPage - 1;
                let nextButton = document.createElement("button");
                let nextPage = currentPage + 1;
                let newUserInput = userInputString.substring(0, userInputString.indexOf("page=") + "page".length + 1);

                //Previous button content
                previousButton.innerHTML = "Previous";
                previousButton.addEventListener("click", 
                    (e) => {
                        e.preventDefault();
                        location.href = `../movie-listing?searching=${newUserInput}${previousPage}`
                    }
                )
                //Next button content
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

                // Rendering page selection based on current page
                if (currentPage == 1) {

                    pagesDiv.appendChild(nextButton);
                    document.querySelector(".movie-list-container").appendChild(pagesDiv);

                } else if (currentPage == numOfPages) {

                    pagesDiv.appendChild(previousButton);
                    document.querySelector(".movie-list-container").appendChild(pagesDiv);

                } else {
                    
                    pagesDiv.appendChild(previousButton);
                    pagesDiv.appendChild(nextButton);
                    document.querySelector(".movie-list-container").appendChild(pagesDiv);

                }
            }
        }
    )
    .catch(
        (error) => {
            console.log(error);
        }
    )
}

export function toMovieListing (page=1) {
    // This function will take the user to movie-listing page with search input in the URL

    const userInput = document.querySelector("#user-input").value;
    const newUserInput = userInput.replace(/\s/g, "+");

    location.href = `../movie-listing?searching=${newUserInput}&page=${page}`
}

 