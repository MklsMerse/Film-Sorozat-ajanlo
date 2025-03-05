import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './GenreSorozatoks.css';
import { FilmekSorozatokKepei } from './FilmekSorozatokKepei';

export const GenreSorozatoks = () => {
  const { mufaj } = useParams();
  const [sorozat, setSorozatok] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const token = loggedInUser.token || 'token';

  useEffect(() => {
    const url = `http://localhost:5104/api/sorozatok/mufaj/${token}/${mufaj}`;
    console.log('Küldöm a kérést:', url);
    fetch(url)
      .then(res => {
        console.log('HTTP státusz:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Kapott adatok:', data);
        setSorozatok(data);
      })
      .catch(err => console.error('Hiba a sorozatok lekérésekor:', err));
  }, [mufaj, token]);

  
  return (
    <div className="genre-sorozatok2">
      <h2>{mufaj} sorozatok</h2>
      <div className="sorozatok2-container">
        {sorozat.length > 0 ? (
          sorozat.map((sorozat) => (
            <div key={sorozat.SorozatId} className="sorozat2-card">
              <img
                src={FilmekSorozatokKepei[sorozat.cim] || '/placeholder.png'}
                alt={sorozat.cim}
                className="sorozat2-image"
              />
              <h3>{sorozat.cim}</h3>
              <p>{sorozat.mufaj}</p>
            </div>
          ))
        ) : (
          <p>Nincsenek találatok a(z) {mufaj} műfajra.</p>
        )}
      </div>
    </div>
  );
};
