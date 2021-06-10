const movieArea = document.querySelector("#movie-list");
const loadBtn = document.querySelector("#load-btn");
const searchBtn = document.querySelector(".fa-search");
// prep for modal popup
const form = document.querySelector("form");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close");
// end of modal prep

let page = 1;
let searchName;

const apiKey = "api_key=885c9d24e6c47a5ae2e79268ce6e1318";
let endPoint = "movie/now_playing";
let apiUrl;

window.onload = function () {
  getApiData();
  searchBtn.addEventListener("click", () => {
    if (form.classList.contains("hidden")) {
      form.classList.remove("hidden");
    } else {
      form.classList.add("hidden");
    }
  });
};

loadBtn.addEventListener("click", () => {
  page++;
  console.log(page);
  getApiData();
});

// functions

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  clearHMTL();
  searchName = evt.target.movieTitle.value;
  console.log(searchName);
  endPoint = "search/movie";
  getApiData();
});

async function getApiData() {
  apiUrl = `https://api.themoviedb.org/3/${endPoint}?${apiKey}&page=${page}&query=${searchName}`;
  // console.log(apiUrl);

  const response = await fetch(apiUrl);
  const responseData = await response.json();
  const results = responseData.results;
  // console.log(results);
  displayMovies(results);

  loadBtn.classList.remove("hidden");
}

function displayMovies(results) {
  results.forEach((element, index) => {
    movieArea.innerHTML += `
    <div class="card">
      <img class="poster" src="https://image.tmdb.org/t/p/original${element.poster_path}" alt="${element.title} poster image" />
      <div class="info">
        <span class="movie-name">${element.title}</span>
        <span class="rating"><i class="fas fa-star"></i>${element.vote_average}</span>
      </div>
    </div>
    `;
  });
}

function clearHMTL() {
  movieArea.innerHTML = " ";
  page = 1;
}
