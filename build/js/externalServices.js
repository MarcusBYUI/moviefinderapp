var c = (a, r, e) =>
  new Promise((n, o) => {
    var s = (t) => {
        try {
          i(e.next(t));
        } catch (l) {
          o(l);
        }
      },
      u = (t) => {
        try {
          i(e.throw(t));
        } catch (l) {
          o(l);
        }
      },
      i = (t) => (t.done ? n(t.value) : Promise.resolve(t.value).then(s, u));
    i((e = e.apply(a, r)).next());
  });
function m(a) {
  if (a.ok) return a.json();
  throw { name: "servicesError", message: a.json() };
}
class h {
  constructor() {
    this.api = "https://www.omdbapi.com/?&apikey=466aa9b6";
  }
  returnMovies(r) {
    return c(this, null, function* () {
      const e = yield fetch(`${this.api}&${r}`),
        n = yield m(e);
      return n;
    });
  }
  moviesSearch(r = "home", e = !1) {
    const n = [
        "batman",
        "superman",
        2022,
        "matrix",
        2019,
        "men in black",
        "Spiderman",
        "Star Wars",
        "Thor",
        2021,
        "Jurassic Park",
        "Top Gun",
        "Avatar",
        "Avengers",
        "Joker",
        "Justice League",
        2e3,
        2018,
        "Interstellar",
        "Inception",
        "Chernobyl",
        "Antman",
        "hunger games",
        "godzilla",
        "kong",
        "doctor strange",
        "wonderwoman",
        "Harry potter",
        "lord of the rings",
        "Fast and furious",
        "scream",
        "Zombieland",
        "Saw",
      ],
      o = new Date().getFullYear(),
      s = Math.floor(Math.random() * n.length);
    return r == "home" ? `s=${n[s]}` : e ? `i=${r}&plot=full` : `s=${r}`;
  }
}
export default h;
