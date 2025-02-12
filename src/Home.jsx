import React, { useEffect, useState } from 'react';
import { MovieList } from './MovieList';
import { SeriesList } from './SeriesList';
import './film.css';

export const Home = () => {
  const [movies, setMovies] = useState([
    { title: "Eredet", image: "movieimages/eredet.jpg", genre: "Sci-Fi" },
    { title: "Titanic", image: "movieimages/titanic.png", genre: "Romantikus" },
    { title: "A sötét lovag", image: "movieimages/sötétlovag.png", genre: "Akció" },
    { title: "Testről és lélekről", image: "movieimages/testrol.jpg", genre: "Dráma" },
    { title: "Dennis, a komisz", image: "movieimages/dennis.png", genre: "Vígjáték" },
    { title: "Indiana Jones és a kristálykoponya királysága", image: "movieimages/indiana.png", genre: "Kaland" },
  ]);
  const [series, setSeries] = useState([
    { title: "Stranger Things", image: "seriesimages/stranger.png", genre: "Sci-Fi" },
    { title: "Rick & Morty", image: "seriesimages/rickandmorty.png", genre: "Animáció" },
    { title: "Nyerd meg az életed", image: "seriesimages/squid.png", genre: "Akció/Dráma" },
    { title: "Trónok harca", image: "seriesimages/tronok.png", genre: "Kaland" },
    { title: "Jóbarátok", image: "seriesimages/friends.jpg", genre: "Vígjáték" }
  ]);

 /* useEffect(() => {
    fetchMovies();
    fetchSeries();
  }, []);
*/
  // Filmek Tömb
  
  /*const fetchMovies = async () => {
    const response = await fetch('https://localhost:5001/api/filmek');
    const data = await response.json();
    setMovies(data);
  };*/

  /*const fetchSeries = async () => {
    const response = await fetch('https://localhost:5001/api/sorozatok');
    const data = await response.json();
    setSeries(data);
  };
*/
  return (
    <div>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="movies.png" className="d-block w-100" alt="Kép 1" />
          </div>
          <div className="carousel-item">
            <img src="movies2.jpeg" className="d-block w-100" alt="Kép 2" />
          </div>
          <div className="carousel-item">
            <img src="logo2.png" className="d-block w-100" alt="Kép 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Előző</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Következő</span>
        </button>
        <div className="slogan">Fókuszban a legjobb filmek és sorozatok!</div>
      </div>
      <main>
        <section id="movies">
          <h2 id="movies-title">Ajánlott filmek</h2>
          <MovieList movies={movies} />
        </section>
        <section id="series">
          <h2 id="series-title">Ajánlott sorozatok</h2>
          <SeriesList series={series} />
        </section>
      </main>
      <section id="website-description">
    <div class="container">
      <h2>Miért érdemes ezt az oldalt használni?</h2>
      <p>Ez a weboldal a szórakoztató tartalmak igazi központja, ahol a felhasználók könnyedén felfedezhetik és élvezhetik az ajánlott filmeket és sorozatokat. Az oldal célja, hogy személyre szabott élményt nyújtson minden látogatónak, legyen szó az aktuális trendekről, a legújabb mozikról vagy időtálló klasszikusokról.</p>
      <p>A felhasználók könnyedén navigálhatnak a különböző műfajok és kategóriák között, miközben élvezhetik a gyönyörű, intuitív felhasználói felületet. Az oldal különböző szűrő- és keresési lehetőségekkel biztosítja, hogy mindenki gyorsan megtalálja a számára érdekes tartalmat, legyen szó egy izgalmas akciófilmről, romantikus vígjátékról, vagy a legújabb sorozat epizódjairól.</p>
  
      <h3>Miért érdemes ezt az oldalt használni?</h3>
      <ul>
        <li><strong>Személyre szabott ajánlások:</strong> Az oldal különböző ajánlásokat kínál a felhasználók korábbi keresései és preferenciái alapján, így mindenki könnyedén rátalálhat a neki tetsző tartalmakra.</li>
        <li><strong>Többféle műfaj és kategória:</strong> Az oldal gazdag tartalomválasztéka lehetővé teszi, hogy a felhasználók bármilyen típusú szórakozást találjanak, a legújabb sci-fi filmektől kezdve a klasszikus drámákig, és mindent, ami közte van.</li>
        <li><strong>Felhasználóbarát dizájn:</strong> A dizájn egyszerű és letisztult, így könnyen navigálhatunk a különböző tartalmak között, miközben a szép színek és elrendezés biztosítják a kellemes vizuális élményt.</li>
        <li><strong>Hírek és frissítések:</strong> A legújabb filmek és sorozatok mellett folyamatosan frissülő híreket és információkat is találhatsz a szórakoztatóipar legújabb trendjeiről, valamint érdekességekről.</li>
        <li><strong>Közösségi élmény:</strong> Az oldal lehetőséget biztosít arra, hogy megoszd véleményedet másokkal, értékelhesd a tartalmakat, és akár barátaidnak is ajánlhass filmeket vagy sorozatokat.</li>
      </ul>
  
      <p>A célunk, hogy minden látogató egyedülálló és élvezetes szórakozást találjon, és a legjobb filmes élményeket kínáljuk, mindezt egy könnyen elérhető és felhasználóbarát platformon.</p>
    </div>
    <section id="website-logo">
      <div class="container">
        <div class="logo-container">
          <img src="logo.png" alt="Weboldal logó" class="website-logo" />
          <h2 style={{color: "#800020"}} className="filmfokuszfelirat">FilmFókusz</h2>
        </div>
      </div>
    </section>
  </section>
    </div>
  );
};
