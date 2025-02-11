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

// Keresés debounced módon
let debounceTimeout;
document.getElementById("nav-search-input").addEventListener("input", () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    const query = document.getElementById("nav-search-input").value.toLowerCase();
    const filteredMovies = movies.filter(movie =>
      movie.title.toLowerCase().includes(query) || movie.genre.toLowerCase().includes(query)
    );
    const filteredSeries = series.filter(serie =>
      serie.title.toLowerCase().includes(query) || serie.genre.toLowerCase().includes(query)
    );
    renderList("movie-list", filteredMovies);
    renderList("series-list", filteredSeries);
  }, 300); // 300ms várakozás
});


const registeredUsers = [];

// Modális ablak referenciák
const modal = document.getElementById("modal");
const closeBtn = document.getElementsByClassName("close-btn")[0];


// Gombok azonosítói
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");

// Funkció a modális ablak megjelenítéséhez
// Funkció a modális ablak megjelenítéséhez
function openModal(formType) {
  modal.style.display = "block";
  document.getElementById("background").classList.add("background-blur"); // A háttér elmosódik

  const modalForm = document.getElementById("modal-form");

  if (formType === 'login') {
    modalForm.innerHTML = `
      <h2>Belépés</h2>
      <form id="login-form">
        <label for="login-username">Felhasználónév:</label>
        <input type="text" id="login-username" name="username" required>
        
        <label for="login-password">Jelszó:</label>
        <input type="password" id="login-password" name="password" required>
        
        <button type="submit">Belépés</button>
      </form>
    `;
  } else if (formType === 'register') {
    modalForm.innerHTML = `
      <h2>Regisztráció</h2>
      <form id="register-form">
        <label for="register-username">Felhasználónév:</label>
        <input type="text" id="register-username" name="username" required>
        
        <label for="register-email">Email:</label>
        <input type="email" id="register-email" name="email" required>
        
        <label for="register-password">Jelszó:</label>
        <input type="password" id="register-password" name="password" required>
        
        <button type="submit">Regisztráció</button>
      </form>
    `;
  }
}

// Bezárás esemény
closeBtn.onclick = function() {
  modal.style.display = "none";
  document.getElementById("background").classList.remove("background-blur"); // A háttér elmosódásának eltávolítása
}

// Ha a felhasználó a modális ablak kívüli területen kattint, bezárja azt
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
    document.getElementById("background").classList.remove("background-blur"); // A háttér elmosódásának eltávolítása
  }
}


// Események a gombokhoz
loginBtn.addEventListener("click", () => openModal('login'));
registerBtn.addEventListener("click", () => openModal('register'));

document.body.addEventListener("submit", (event) => {
  if (event.target.id === "register-form") {
    event.preventDefault(); // Ne küldje el az űrlapot
    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    // Regisztráljuk a felhasználót
    registeredUsers.push({ username, email, password });

    // Üzenet a sikeres regisztrációról
    alert("Sikeres regisztráció!");

    modal.style.display = "none"; // Bezárjuk a modált
  }
});

// Belépés űrlap elküldése
document.body.addEventListener("submit", (event) => {
  if (event.target.id === "login-form") {
    event.preventDefault(); // Ne küldje el az űrlapot
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // Ellenőrizzük, hogy a felhasználó regisztrált-e
    const user = registeredUsers.find(user => user.username === username && user.password === password);

    if (user) {
      alert("Sikeres belépés!");
      modal.style.display = "none"; // Bezárjuk a modált
    } else {
      alert("Kérem először regisztráljon!"); // Ha nem regisztrált
    }
  }
});

