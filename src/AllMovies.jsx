import React, { useEffect, useState } from 'react';
import './AllMovies.css';
import { DetailModal } from './DetailModal';
import { FilmekSorozatokKepei } from './FilmekSorozatokKepei';



export const AllMovies = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const token = loggedInUser.token || 'token';

  useEffect(() => {
    const url = `http://localhost:5104/api/filmek/${token}`;
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
      .catch((err) => console.error('Hiba az összes film lekérésekor:', err));
  }, [token]);
  
  const handleCardClick = (film) => {
    setSelectedItem({ ...film, tipus: 'Film' });
  };

  return (
    <div className="osszes-filmek">
      <h2>Összes film</h2>
      <div className="movies-wrapper">
        <div className="all-movies-container">
          {movies.length > 0 ? (
            movies.map((film) => (
              <div
                key={film.FilmId}
                className="all-movie-card"
                onClick={() => handleCardClick(film)}
              >
                <img
                  src={FilmekSorozatokKepei[film.cim] || '/placeholder.png'}
                  alt={film.cim}
                  className="film-kep"
                />
                <h3>{film.cim}</h3>
                <p>{film.mufaj}</p>
              </div>
            ))
          ) : (
            <p>Betöltés...</p>
          )}
        </div>
      </div>

      {/* Ha van kiválasztott film, megjelenítjük a DetailModal-t */}
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onRatingUpdate={(id, newRating, tipus) => {
            // API-hívással itt lehetne frissíteni az értékelést az adatbázisban
            console.log('Frissítem az értékelést:', id, newRating, tipus);
            // Frissítjük a local state-et, hogy a modalon is látszódjon a változás
            setSelectedItem({ ...selectedItem, ertekeles: newRating });
          }}
        />
      )}
    </div>
  );
};
