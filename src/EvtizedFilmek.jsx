import React, { useState, useEffect } from 'react';
import { DetailModal } from './DetailModal';
import { FilmekSorozatokKepei } from './FilmekSorozatokKepei';

const EvtizedMenu = () => {
  const [movies, setMovies] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null); 
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const token = loggedInUser.token || 'token';

  useEffect(() => {
    const url = `http://localhost:5104/api/filmek/filmek-evtized/${token}/${selectedYear}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP hiba: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => console.error('Hiba a film lekérésekor:', err));
  }, [token, selectedYear]);

  const handleCardClick = (film) => {
    setSelectedItem({ ...film, tipus: 'Film' });
  };

  return (
    <div>
      <div className="osszes-filmek">
     <h2>Filmek évtized Szerint:</h2>
      <div className="year-buttons-container">
        <button className="year-button" onClick={() => setSelectedYear(1970)}>1970</button>
        <button className="year-button" onClick={() => setSelectedYear(1980)}>1980</button>
        <button className="year-button" onClick={() => setSelectedYear(1990)}>1990</button>
        <button className="year-button" onClick={() => setSelectedYear(2000)}>2000</button>
        <button className="year-button" onClick={() => setSelectedYear(2010)}>2010</button>
        <button className="year-button" onClick={() => setSelectedYear(2020)}>2020</button>
      </div>

      <div className="movies-wrapper">
        <div className="all-movies-container">
          {movies.length > 0 ? (
            movies.map((film) => {
              const filmImage = FilmekSorozatokKepei[film.cim]?.image || '/placeholder.png';
              const filmTrailer = FilmekSorozatokKepei[film.cim]?.trailer || '/placeholder.png';

              return (
                <div
                  key={film.FilmId}
                  className="all-movie-card"
                  onClick={() => handleCardClick(film)}
                  style={{
                    backgroundImage: `url(${filmTrailer})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <img
                    src={filmImage}
                    alt={film.cim}
                    className="film-kep"
                  />
                  <h3>{film.cim}</h3>
                  <p>{film.mufaj}</p>
                </div>
              );
            })
          ) : (
            <p className='NoMovies'>Kattintos! Melyik évtizedben szeretne informálódni filmekről?</p>
          )}
        </div>
      </div>
      </div>
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onRatingUpdate={(id, newRating, tipus) => {
            console.log('Frissítem az értékelést:', id, newRating, tipus);
            setSelectedItem({ ...selectedItem, ertekeles: newRating });
          }}
        />
      )}
    </div>
  );
};

export default EvtizedMenu;
