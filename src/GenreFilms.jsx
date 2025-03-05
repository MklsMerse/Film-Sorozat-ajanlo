import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './GenreFilms.css';
import { FilmekSorozatokKepei } from './FilmekSorozatokKepei';



export const GenreFilms = () => {
  const { mufaj } = useParams();
  const [filmek, setFilmek] = useState([]);

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

  return (
    <div className="genre-filmek">
      <h2>{mufaj} filmek</h2>
      <div className="filmek2-container">
        {filmek.length > 0 ? (
          filmek.map((film) => (
            <div key={film.FilmId} className="film2-card">
              <img
                src={FilmekSorozatokKepei[film.cim] || '/placeholder.png'}
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
    </div>
  );
};
