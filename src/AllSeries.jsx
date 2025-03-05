import React, { useEffect, useState } from 'react';
import './AllSeries.css';
import { FilmekSorozatokKepei } from './FilmekSorozatokKepei';


export const AllSeries = ({ searchTerm }) => {
  const [sorozat, setSeries] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const token = loggedInUser.token || 'token';

  useEffect(() => {
    const url = `http://localhost:5104/api/sorozatok/${token}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP hiba: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setSeries(data);
      })
      .catch((err) => console.error('Hiba az összes sorozat lekérésekor:', err));
  }, [token]);

  return (
    <div className="osszes-sorozatok">
      <h2>Összes sorozat</h2>
      <div className="series-wrapper">
      <div className="all-series-container">
        {sorozat.length > 0 ? (
          sorozat.map((sorozat) => (
            <div key={sorozat.SorozatId} className="all-series-card">
              <img
                src={FilmekSorozatokKepei[sorozat.cim] || '/placeholder.png'}
                alt={sorozat.cim}
                className="sorozat-kep"
              />
              <h3>{sorozat.cim}</h3>
              <p>{sorozat.mufaj}</p>
            </div>
          ))
        ) : (
          <p>Betöltés...</p>
        )}
      </div>
      </div>
    </div>
  );
};
