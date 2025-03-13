import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './GenreFilms.css';
import { FilmekSorozatokKepei } from './FilmekSorozatokKepei';
import { DetailModal } from './DetailModal';

export const GenreFilms = () => {
  const { mufaj } = useParams();
  const [filmek, setFilmek] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // New state for selected film

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const token = loggedInUser.token || 'token';

  useEffect(() => {
    const url = `http://localhost:5104/api/filmek/mufaj/${token}/${mufaj}`;
    console.log('Küldöm a kérést:', url);
    fetch(url)
      .then(res => {
        console.log('HTTP státusz:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Kapott adatok:', data);
        setFilmek(data);
      })
      .catch(err => console.error('Hiba a filmek lekérésekor:', err));
  }, [mufaj, token]);

  // Handle card click event to set selected film for modal
  const handleCardClick = (film) => {
    setSelectedItem({ ...film, tipus: 'Film' });
  };

  return (
    <div className="genre-filmek">
      <h2>{mufaj} filmek</h2>
      <div className="filmek2-container">
        {filmek.length > 0 ? (
          filmek.map((film) => (
            <div
              key={film.FilmId}
              className="film2-card"
              onClick={() => handleCardClick(film)}
              style={{
                backgroundImage: `url(${FilmekSorozatokKepei[film.cim]?.trailer || '/placeholder.png'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <img
                src={FilmekSorozatokKepei[film.cim]?.image || '/placeholder.png'}
                alt={film.cim}
                className="film2-image"
              />
              <h3>{film.cim}</h3>
              <p>{film.mufaj}</p>
            </div>
          ))
        ) : (
          <p>Nincsenek találatok a(z) {mufaj} műfajra.</p>
        )}
      </div>

      {/* Conditionally render the DetailModal if a film is selected */}
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
