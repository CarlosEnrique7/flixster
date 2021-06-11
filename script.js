const movieArea = document.querySelector("#movie-list");
const loadBtn = document.querySelector("#load-btn");
const searchBtn = document.querySelector(".fa-search");
const nowPlaying = document.querySelector(".now-playing");
// prep for modal popup
const form = document.querySelector("form");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close");
let cards;
const movieInfo = document.querySelector(".movie-info");
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

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// functions

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  clearHMTL();
  searchName = evt.target.movieTitle.value;
  if (!searchName) {
    endPoint = "movie/now_playing";
    page = 1;
    nowPlaying.innerHTML = "Now Playing";
  } else {
    endPoint = "search/movie";
    nowPlaying.innerHTML = "Search Results";
  }

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
  let posterPath;
  results.forEach((element) => {
    // displays coming soon image if movie does not have a poster, else displays poster.
    if (element.poster_path == null) {
      posterPath = "./images/comingSoon.jpeg";
    } else {
      posterPath = `https://image.tmdb.org/t/p/original${element.poster_path}`;
    }

    movieArea.innerHTML += `
    <div class="card" id="${element.id}">
      <img class="poster" src="${posterPath}" alt="${element.title} poster image" />
      <div class="info">
        <span class="movie-name">${element.title}</span>
        <span class="rating"><i class="fas fa-star"></i>${element.vote_average}</span>
      </div>
    </div>
    `;
    cards = document.querySelectorAll(".card");
  });
  console.log(Array.from(cards));
  posterButton(cards);
}

function clearHMTL() {
  movieArea.innerHTML = " ";
  page = 1;
}

function posterButton(cards) {
  cards.forEach((element, index) => {
    element.addEventListener("click", () => {
      modal.classList.remove("hidden");
      getMovieInfo(cards[index].id);
      // movieId = getApiData();
    });
  });
}

async function getMovieInfo(movieId) {
  let infoApiUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?${apiKey}&language=en-US`;
  // console.log(infoApiUrl);

  const response = await fetch(infoApiUrl);
  const responseData = await response.json();
  const results = responseData.results;
  // console.log(results);

  movieInfo.innerHTML = `
  <iframe id="ytplayer" type="text/html" width="640" height="360"
  src="https://www.youtube.com/embed/${results[0].key}?autoplay=1&origin=http://example.com"
  frameborder="0"></iframe>
  <div class="desc-area"></div>
  `;

  getDetails(movieId);
}

async function getDetails(movieId) {
  let descApiUrl = `https://api.themoviedb.org/3/movie/${movieId}?${apiKey}`;
  console.log(descApiUrl);

  const res = await fetch(descApiUrl);
  const resData = await res.json();
  document.querySelector(".desc-area").innerHTML += `
  <p class="overview-desc">${resData.overview}</p>
  `;
}
