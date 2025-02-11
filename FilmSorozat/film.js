// Példa adatbázis
const movies = [
    { title: "Inception", image: "https://via.placeholder.com/200x300", genre: "Sci-Fi" },
    { title: "Titanic", image: "https://via.placeholder.com/200x300", genre: "Romance" },
    { title: "The Dark Knight", image: "https://via.placeholder.com/200x300", genre: "Action" },
  ];
  
  const series = [
    { title: "Stranger Things", image: "https://via.placeholder.com/200x300", genre: "Mystery" },
    { title: "Breaking Bad", image: "https://via.placeholder.com/200x300", genre: "Drama" },
    { title: "The Witcher", image: "https://via.placeholder.com/200x300", genre: "Fantasy" },
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
  
  // Keresés funkció
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
  