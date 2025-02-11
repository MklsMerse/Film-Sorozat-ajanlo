// Példa adatbázis
const movies = [
  { title: "Eredet", image: "https://via.placeholder.com/200x300", genre: "Sci-Fi" },
  { title: "Titanic", image: "https://via.placeholder.com/200x300", genre: "Romantikus" },
  { title: "A sötét lovag", image: "https://via.placeholder.com/200x300", genre: "Akció" },
  { title: "Testről és lélekről", image: "https://via.placeholder.com/200x300", genre: "Dráma" },
  { title: "Kis város", image: "https://via.placeholder.com/200x300", genre: "Vígjáték" },
  { title: "A Viszkis", image: "https://via.placeholder.com/200x300", genre: "Bűnügyi" },
];

// Sorozatok adatbázisa magyar sorozatokkal
const series = [
  { title: "Stranger Things", image: "https://via.placeholder.com/200x300", genre: "Rejtély" },
  { title: "Breaking Bad", image: "https://via.placeholder.com/200x300", genre: "Dráma" },
  { title: "A varázsló", image: "https://via.placeholder.com/200x300", genre: "Fantasy" },
  { title: "Terápia", image: "https://via.placeholder.com/200x300", genre: "Dráma" },
  { title: "A mi kis falunk", image: "https://via.placeholder.com/200x300", genre: "Vígjáték" },
];
  
  // Elemlista létrehozása
  function renderList(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; 
    items.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.genre}</p>
      `;
      container.appendChild(card);
    });
  }
  
  // Kezdő adatok betöltése
  document.addEventListener("DOMContentLoaded", () => {
    renderList("movie-list", movies);
    renderList("series-list", series);
  });

  document.getElementById("search-btn").addEventListener("click", () => {
    const query = document.getElementById("search-input").value.toLowerCase();
    const filteredMovies = movies.filter(movie =>
      movie.title.toLowerCase().includes(query) || movie.genre.toLowerCase().includes(query)
    );
    const filteredSeries = series.filter(serie =>
      serie.title.toLowerCase().includes(query) || serie.genre.toLowerCase().includes(query)
    );
  
    renderList("movie-list", filteredMovies);
    renderList("series-list", filteredSeries);
  });
  
  