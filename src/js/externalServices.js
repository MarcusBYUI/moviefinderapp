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
    return data;
  }

  moviesSearch(name = "home", details = false) {
    //function to check name string and retrun it as a callback to the
    // decide the name and year

    const list = ["batman", "superman", 2022];
    const date = new Date().getFullYear();

    const index = Math.floor(Math.random() * list.length);
    // returns the movies on the homepage
    if (name == "home") {
      return `s=${list[index]}&y=${date}`;
    }
    // returns the movie for the details page
    else if (details) {
      return `i=${name}&plot=full`;
    }
    // returns the movie for the search page
    else {
      return `s=${name}`;
    }
  }
}

export default ExternalServices;
