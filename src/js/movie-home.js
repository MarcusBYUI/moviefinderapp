import ExternalServices from "./externalServices";
import { loadHeaderFooter } from "./utils";

loadHeaderFooter();

const externals = new ExternalServices();
externals.returnMovies(externals.moviesSearch());
