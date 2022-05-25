function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw { name: "servicesError", message: res.json() };
  }
}

class ExternalServices {
  constructor() {
    this.api = "http://www.omdbapi.com/?&apikey=466aa9b6";
  }

  async returnMovies(callback) {
    const response = await fetch(`${this.api}&${callback}`);
    const data = await convertToJson(response);
    console.log(data);
  }

  moviesSearch(name = "home") {
    //function to check name string and retrun it as a callback to the
    // decide the name and year

    const list = ["batman", "superman", 2022];
    const date = new Date().getFullYear();

    const index = Math.floor(Math.random() * list.length);
    switch (name) {
      case "home":
        return `s=${list[index]}&y=${date}]`;

      default:
        // s=${name}
        break;
    }
  }

  singleMovieSearch (movieId = "tt0796366") {
      const movie = `i=${movieId}&plot=full`
      return movie
  }
}

export default ExternalServices;