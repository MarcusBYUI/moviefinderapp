import ExternalServices from "./externalServices";
import { loadHeaderFooter } from "./utils";

loadHeaderFooter();



function movieHomeShow(){
  const externals = new ExternalServices();
  const divContainer = document.querySelector("#movie_section");
  for (let i = 0; i <= 7; i++) {
    const movies = externals.returnMovies(externals.moviesSearch());  
    movies.then((data)=>{
    console.log(data);
    let arrayLen = data.Search.length;
    
    let index = Math.floor(Math.random() * arrayLen);
    let Id = data.Search[index].imdbID;
    
    let aSource = document.createElement("a");
    aSource.setAttribute("href", Id);

    let title = document.createElement("div");
    title.setAttribute("class", "recent-movies");

    let posterContainer = document.createElement("img");
    let posterSource = data.Search[index].Poster;
    if (posterSource === "N/A"){
      posterContainer.setAttribute("src", `https://via.placeholder.com/300x450/000000/FFFFFF/?text=${data.Search[index].Title}`);
    } else {
      posterContainer.setAttribute("src", data.Search[index].Poster);
    }
    posterContainer.setAttribute("alt", data.Search[index].Title);
    aSource.appendChild(posterContainer);
    title.appendChild(aSource);
    divContainer.appendChild(title);

  });
}
}



movieHomeShow();