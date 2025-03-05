import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';
import { FilmekSorozatokKepei } from './FilmekSorozatokKepei';


export const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const term = queryParams.get('term')?.toLowerCase() || '';

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const token = loggedInUser.token || 'token';

  useEffect(() => {
    // Egyszerre kérjük le a filmeket és a sorozatokat, majd egy tömbbe fűzzük őket
    const filmUrl = `http://localhost:5104/api/filmek/${token}`;
    const seriesUrl = `http://localhost:5104/api/sorozatok/${token}`;

    // Promise.all-lal párhuzamosan hívjuk meg a két végpontot
    Promise.all([
      fetch(filmUrl).then((res) => {
        if (!res.ok) throw new Error(`Film hiba: ${res.status}`);
        return res.json();
      }),
      fetch(seriesUrl).then((res) => {
        if (!res.ok) throw new Error(`Sorozat hiba: ${res.status}`);
        return res.json();
      }),
    ])
      .then(([filmsData, seriesData]) => {
        // A filmeknél átalakítjuk a struktúrát egy közös séma szerint
        const filmResults = filmsData.map((film) => ({
          id: film.FilmId,
          cim: film.cim,
          mufaj: film.mufaj,
          url: film.FilmUrl,
          tipus: 'Film', // Megkülönböztetéshez
        }));

        // Ugyanez sorozatokra
        const seriesResults = seriesData.map((sorozat) => ({
          id: sorozat.SorozatId,
          cim: sorozat.cim,
          mufaj: sorozat.mufaj,
          url: sorozat.SorozatUrl,
          tipus: 'Sorozat',
        }));

        // Összefűzzük a két tömböt
        const combined = [...filmResults, ...seriesResults];

        // Keresési kifejezés alapján szűrés (címben szerepel-e)
        const filtered = combined.filter((item) =>
          item.cim.toLowerCase().includes(term)
        );

        setResults(filtered);
      })
      .catch((err) => console.error('Hiba a keresési eredmények lekérésekor:', err));
  }, [term, token]);

  return (
    <div className="search-results">
      <h2>Keresés: "{term}"</h2>
      <div className="results-container">
        {results.length > 0 ? (
          results.map((item) => (
            <div key={`${item.tipus}-${item.id}`} className="result-card">
              <img
                src={FilmekSorozatokKepei[item.cim] || '/placeholder.png'}
                alt={item.cim}
                className="result-image"
              />
              <h3>{item.cim}</h3>
              <p>{item.mufaj}</p>
              <p className="tipus-label">{item.tipus}</p>
            </div>
          ))
        ) : (
          <p className='nincs-talalat'>Nincs találat! <i className="fa-solid fa-magnifying-glass-minus"></i></p>
        )}
      </div>
    </div>
  );
};
