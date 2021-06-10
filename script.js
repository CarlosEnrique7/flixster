const movieArea = document.querySelector("#movie-list");

let page = 1;

getApiData();

// functions

async function getApiData(evt) {
  const apiKey = "api_key=885c9d24e6c47a5ae2e79268ce6e1318";
  const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?${apiKey}&page=${page}`;
  const response = await fetch(apiUrl);
  const responseData = await response.json();
  const results = responseData.results;
  console.log(results);
  displayMovies(results);
}

function displayMovies(results) {
  results.forEach((element, index) => {
    movieArea.innerHTML += `
    <div class="card">
      <img class="poster" src="https://image.tmdb.org/t/p/original${results[index].poster_path}" alt="${results[index].title} poster image" />
      <div class="info">
        <span class="movie-name">${results[index].title}</span>
        <span class="rating">${results[index].vote_average}</span>
      </div>
    </div>
    `;
    console.log(results[index].poster_path);
    console.log(results[index].title);
  });
}
