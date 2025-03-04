import React, { useEffect, useState } from 'react';
import './film.css';

const filmKepek = {
  "Eredet" : "https://journality.hu/wp-content/uploads/2010/10/eredet.jpg",
  "Titanic" : "https://m.media-amazon.com/images/M/MV5BYzYyN2FiZmUtYWYzMy00MzViLWJkZTMtOGY1ZjgzNWMwN2YxXkEyXkFqcGc@._V1_.jpg",
  "A sötét lovag" : "https://www.mafab.hu/static/profiles/2014/292/23/2384_4.jpg",
  "Testről és lélekről" : "https://images.justwatch.com/poster/111082300/s718/testrol-es-lelekrol.jpg",
  "Kis város" : "https://m.media-amazon.com/images/M/MV5BYjMyYTc1MGYtNDdlYS00MTk1LWJiNDMtMzg4MDUzNWJiNmE4XkEyXkFqcGc@._V1_.jpg",
  "A Viszkis" : "https://media.port.hu/images/000/979/788.jpg",
};

const sorozatImages = {
  "Terápia" : "https://m.media-amazon.com/images/M/MV5BNDgwNDE2NTA5OV5BMl5BanBnXkFtZTgwNjg5MTczNTE@._V1_.jpg",
  "A mi kis falunk" : "https://images.justwatch.com/poster/302072377/s718/evad-1.jpg",
  "Stranger Things" : "https://static.posters.cz/image/350/plakatok/stranger-things-seasons-i132237.jpg",
  "A Térség" : "https://m.media-amazon.com/images/M/MV5BYzUyYmI3MjctY2Q2MC00NmFjLTgwZGUtNWQzZWNlYmVjNzE2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Westworld" : "https://m.media-amazon.com/images/M/MV5BMjM2MTA5NjIwNV5BMl5BanBnXkFtZTgwNjI2OTMxNTM@._V1_FMjpg_UX1000_.jpg",
  "Black Mirror" : "https://hips.hearstapps.com/hmg-prod/images/black-mirror-font-1513096756.jpg?crop=1xw:1xh;center,top&resize=980:*",
};

export const Home = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [sorozat, setSeries] = useState([]);

  // A token kinyerése a localStorage-ból
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const token = loggedInUser.token || 'token';
  

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

useEffect(() => {
  const url = `http://localhost:5104/api/filmek/${token}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      setMovies(data.slice(0, 6));
    })
    .catch(err => console.error('Hiba az ajánlott filmek lekérésekor:', err));
}, [token]);

useEffect(() => {
  const seriesUrl = `http://localhost:5104/api/sorozatok/${token}`;
  console.log('Küldöm a sorozatok kérését:', seriesUrl);
  fetch(seriesUrl)
    .then((res) => {
      console.log('Sorozatok HTTP státusz:', res.status);
      return res.json();
    })
    .then((data) => {
      console.log('Sorozatok adatai:', data);
      setSeries(data.slice(0, 6));
    })
    .catch((err) => console.error('Hiba az ajánlott sorozatok lekérésekor:', err));
}, [token]);

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
          <div className="filmek-container">
            {movies.length > 0 ? (
              movies.map((film) => (
                <div key={film.FilmId} className="film-card">
                  <img
                    src={filmKepek[film.cim] || '/placeholder.png'}
                    alt={film.cim}
                    className="film-image"
                  />
                  <h3>{film.cim}</h3>
                  <p>{film.mufaj}</p>
                </div>
              ))
            ) : (
              <p>Betöltés...</p>
            )}
          </div>
        </section>
        <br />
        <section id="series">
          <h2 id="series-title">Ajánlott sorozatok</h2>
          <div className="sorozatok-container">
        {sorozat.length > 0 ? (
          sorozat.map((sorozat) => (
            <div key={sorozat.SorozatId} className="sorozat-card">
              <img
                src={sorozatImages[sorozat.cim] || '/placeholder.png'}
                alt={sorozat.cim}
                className="sorozat-image"
              />
              <h3>{sorozat.cim}</h3>
              <p>{sorozat.mufaj}</p>
            </div>
              ))
            ) : (
              <p>Betöltés...</p>
            )}
          </div>
        </section>
      </main>
      <section id="website-description">
    <div className="container">
      <h2>Miért érdemes ezt az oldalt használni?</h2>
      <p>Ez a weboldal a szórakoztató tartalmak igazi központja, ahol a felhasználók könnyedén felfedezhetik és élvezhetik az ajánlott filmeket és sorozatokat. Az oldal célja, hogy személyre szabott élményt nyújtson minden látogatónak, legyen szó az aktuális trendekről, a legújabb mozikról vagy időtálló klasszikusokról.</p>
      <p>A felhasználók könnyedén navigálhatnak a különböző műfajok és kategóriák között, miközben élvezhetik a gyönyörű, intuitív felhasználói felületet. Az oldal különböző szűrő- és keresési lehetőségekkel biztosítja, hogy mindenki gyorsan megtalálja a számára érdekes tartalmat, legyen szó egy izgalmas akciófilmről, romantikus vígjátékról, vagy a legújabb sorozat epizódjairól.</p>
  
      <h3>Miért érdemes ezt az oldalt használni?</h3>
      <ul>
        <li><strong>Személyre szabott ajánlások:</strong> Az oldal különböző ajánlásokat kínál a felhasználóknak, így mindenki könnyedén rátalálhat a neki tetsző tartalmakra.</li>
        <li><strong>Többféle műfaj és kategória:</strong> Az oldal gazdag tartalomválasztéka lehetővé teszi, hogy a felhasználók bármilyen típusú szórakozást találjanak, a legújabb sci-fi filmektől kezdve a klasszikus drámákig, és mindent, ami közte van.</li>
        <li><strong>Felhasználóbarát dizájn:</strong> A dizájn egyszerű és letisztult, így könnyen navigálhatunk a különböző tartalmak között, miközben a szép színek és elrendezés biztosítják a kellemes vizuális élményt.</li>
        <li><strong>Hírek és frissítések:</strong> A legújabb filmek és sorozatok mellett folyamatosan frissülő híreket és információkat is találhatsz a szórakoztatóipar legújabb trendjeiről, valamint érdekességekről.</li>
        <li><strong>Közösségi élmény:</strong> Az oldal lehetőséget biztosít arra, hogy megoszd véleményedet másokkal, értékelhesd a tartalmakat, és akár barátaidnak is ajánlhass filmeket vagy sorozatokat.</li>
      </ul>
  
      <p>A célunk, hogy minden látogató egyedülálló és élvezetes szórakozást találjon, és a legjobb filmes élményeket kínáljuk, mindezt egy könnyen elérhető és felhasználóbarát platformon.</p>
    </div>
    <section id="website-logo">
      <div className="container">
        <div className="logo-container">
          <img src="logo.png" alt="Weboldal logó" className="website-logo" />
          <h2 style={{color: "#800020"}} className="filmfokuszfelirat">FilmFókusz</h2>
        </div>
      </div>
    </section>
  </section>
    </div>
  );
};
