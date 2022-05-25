import ExternalServices from "./externalServices";

const externals = new ExternalServices();
externals.returnMovies(externals.moviesSearch());
externals.returnMovies(externals.singleMovieSearch());