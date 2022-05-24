export function getUrlParams(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movie = urlParams.get(param);
    return movie;
  }