import React, { useEffect, useState } from 'react';
import './film.css';
import { FilmekSorozatokKepei } from './FilmekSorozatokKepei';
import { DetailModal } from './DetailModal';
import QuizModal from './QuizModal';

export const Home = ({ searchTerm, onFocusSearch }) => {
  const [movies, setMovies] = useState([]);
  const [sorozat, setSeries] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);


  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const token = loggedInUser.token || 'token';

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const url = `http://localhost:5104/api/filmek/${token}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setMovies(data.slice(0, 7));
      })
      .catch(err => console.error('Hiba az ajánlott filmek lekérésekor:', err));
  }, [token]);

  useEffect(() => {
    const seriesUrl = `http://localhost:5104/api/sorozatok/${token}`;
    console.log('Küldöm a sorozatok kérését:', seriesUrl);
    fetch(seriesUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log('Sorozatok adatai:', data);
        setSeries(data.slice(0, 7));
      })
      .catch((err) => console.error('Hiba az ajánlott sorozatok lekérésekor:', err));
  }, [token]);

  // Filmkártya kattintás kezelése
  const handleFilmClick = (film) => {
    setSelectedItem({ ...film, tipus: 'Film' });
  };

  // Sorozatkártya kattintás kezelése
  const handleSeriesClick = (soro) => {
    setSelectedItem({ ...soro, tipus: 'Sorozat' });
  };

  return (
    <div>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        {/* Carousel kód marad változatlanul */}
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
          <div 
            key={film.FilmId} 
            className="film-card"
            onClick={() => handleFilmClick(film)} // Klikkeléskor meghívódik a funkció
          >
            <img
              src={FilmekSorozatokKepei[film.cim]?.image || '/placeholder.png'} // Kép megjelenítése
              alt={film.cim}
              className="film-image"
            />
            <h3>{film.cim}</h3>
            <p>{film.mufaj}</p>
          </div>
        ))
      ) : (
        <p className='betoltes'>Betöltés...</p>
      )}
    </div>
  </section>
  <br />
  <section id="series">
    <h2 id="series-title">Ajánlott sorozatok</h2>
    <div className="sorozatok-container">
      {sorozat.length > 0 ? (
        sorozat.map((soro) => (
          <div 
            key={soro.SorozatId} 
            className="sorozat-card"
            onClick={() => handleSeriesClick(soro)} 
          >
            <img
              src={FilmekSorozatokKepei[soro.cim]?.image || '/placeholder.png'}
              alt={soro.cim}
              className="sorozat-image"
            />
            <h3>{soro.cim}</h3>
            <p>{soro.mufaj}</p>
          </div>
        ))
      ) : (
        <p className='betoltes'>Betöltés...</p>
      )}
    </div>
  </section>
</main>

      
<section id="website-description">
      <div className="container">
        <div className="intro-text">
          <h2>🎬 Üdvözlünk a <span className="highlight">FilmFókusz</span> világában!</h2>
          <p>
            Fedezd fel a legjobb filmeket és sorozatokat egyetlen kattintással. Akár egy klasszikust keresel, akár a legújabb kasszasikert, nálunk mindent megtalálsz!  
          </p>
        </div>

        <div className="features">
          <div className="feature-card">
            <h3>🎯 Személyre szabott ajánlások</h3>
            <p>Film- és sorozatajánlásaid az ízlésedhez igazodnak, hogy mindig a legjobb tartalmat nézhesd.</p>
          </div>

          <div className="feature-card">
            <h3>🔍 Okos keresés és szűrés</h3>
            <p>Szűrj műfaj, év és még sok más szerint, hogy megtaláld, amit keresel.</p>
          </div>

          <div className="feature-card">
            <h3>🌍 Nemzetközi és hazai kínálat</h3>
            <p>Fedezd fel a legjobb külföldi és magyar alkotásokat egy helyen.</p>
          </div>

          <div className="feature-card">
            <h3>💬 Vélemények és értékelések</h3>
            <p>Nézd meg mások értékeléseit, és oszd meg saját véleményedet!</p>
          </div>

          <div className="feature-card">
            <h3>🔄 Legnézettebb tartalmak</h3>
            <p>Fedezd fel, hogy mely filmek és sorozatok a legnépszerűbbek a felhasználók körében!</p>
          </div>

          <div className="feature-card">
            <h3>🎞️ Kiemelt premierajánlók</h3>
            <p>Tudj meg többet a kedvenc mozifilmedről vagy sorozatodról!</p>
          </div>

        </div>

        <div className="cta-section">
          <h3>🎥 Csatlakozz hozzánk, és fedezd fel a legjobb filmeket!</h3>
          <button className="cta-button" onClick={handleModalOpen}>Felfedezés</button>
          {isModalOpen && <QuizModal closeModal={handleModalClose} />}
        </div>
      </div>

      <section id="website-logo">
        <div className="container">
          <div className="logo-container">
            <img src="logo.png" alt="Weboldal logó" className="website-logo" />
            <h2 className="filmfokuszfelirat">FilmFókusz</h2>
          </div>
        </div>
      </section>
    </section>
      
    

      {selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onRatingUpdate={(id, newRating, tipus) => {
            console.log("Frissítem az értékelést:", id, newRating, tipus);
            setSelectedItem({ ...selectedItem, ertekeles: newRating });
          }}
        />
      )}
    </div>
  );
};
