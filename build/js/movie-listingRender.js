import{getUrlParams as h}from"./utils.js";export function renderMovies(o,l){const d=l.returnMovies(l.moviesSearch(o));d.then(a=>{const r=a,v=r.Search;r.Error=="Too many results."?document.querySelector(".movie-list-container").innerHTML=`
                    <h1>Oops!!</h1>
                    <p>Something went wrong</p>
                    <p>${r.Error} Try seaching with more specific words.</p>
                    `:r.Error=="Movie not found!"&&(document.querySelector(".movie-list-container").innerHTML=`
                    <h1>Oops!!</h1>
                    <p>Something went wrong</p>
                    <p>${r.Error}</p>
                    <p>Please try again</p>
                    `);for(const t of v){const s=document.createElement("div"),i=document.createElement("div"),e=document.createElement("div");let n=t.Poster;n=="N/A"&&(n=`https://via.placeholder.com/300x450/000000/FFFFFF/?text=${t.Title}`),i.innerHTML=`
                <img src="${n}" alt="${t.Title}">
                `,e.innerHTML=`
                <a href="../movie-details/?movie=${t.imdbID}">
                    <h1>${t.Title}</h1>
                </a>

                <p>Year: ${t.Year}</p>
                `,s.classList.add("movie-short-info"),i.classList.add("movieChild1"),e.classList.add("movieChild2"),s.appendChild(i),s.appendChild(e),document.querySelector(".movie-list-container").appendChild(s)}const m=+`${r.totalResults}`;if(m>10){const t=+h("page"),s=m%10;let i=m/10;s>0&&(i=Math.floor(i+1));let e=document.createElement("div"),n=document.createElement("button"),g=t-1,c=document.createElement("button"),f=t+1,u=o.substring(0,o.indexOf("page=")+"page".length+1);n.innerHTML="Previous",n.addEventListener("click",p=>{p.preventDefault(),location.href=`../movie-listing/?searching=${u}${g}`}),c.innerHTML="Next",c.addEventListener("click",p=>{p.preventDefault(),location.href=`../movie-listing/?searching=${u}${f}`}),e.classList.add("page-selection"),e.innerHTML=`
                <p>Page ${h("page")} of ${i}</p>
                `,t==1?(e.appendChild(c),document.querySelector(".movie-list-container").appendChild(e)):t==i?(e.appendChild(n),document.querySelector(".movie-list-container").appendChild(e)):(e.appendChild(n),e.appendChild(c),document.querySelector(".movie-list-container").appendChild(e))}}).catch(a=>{throw Error(a)})}export function toMovieListing(){const o=document.URL;let l="";const d=document.querySelector("#user-input").value,a=d.replace(/\s/g,"+");(o.includes("movie-details")||o.includes("movie-listing"))&&(l="../"),location.href=`${l}movie-listing/?searching=${a}&page=1`}
