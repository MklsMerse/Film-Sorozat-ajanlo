import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';
import { FilmekSorozatokKepei } from './FilmekSorozatokKepei';
import { DetailModal } from './DetailModal';

export const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const term = queryParams.get('term')?.toLowerCase() || '';

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const token = loggedInUser.token || 'token';

  useEffect(() => {
    const filmUrl = `http://localhost:5104/api/filmek/${token}`;
    const seriesUrl = `http://localhost:5104/api/sorozatok/${token}`;

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
        const filmResults = filmsData.map((film) => ({
          id: film.FilmId,
          cim: film.cim,
          mufaj: film.mufaj,
          url: film.filmUrl,
          tipus: 'Film',
          leiras: film.leiras,
          rendezo: film.rendezo,
          szereplok: film.szereplok,
          ertekeles: film.ertekeles,
          megjelenesiDatum: film.megjelenesiDatum,
        }));

        const seriesResults = seriesData.map((sorozat) => ({
          id: sorozat.SorozatId,
          cim: sorozat.cim,
          mufaj: sorozat.mufaj,
          url: sorozat.sorozatUrl,
          tipus: 'Sorozat',
          leiras: sorozat.leiras,
          rendezo: sorozat.rendezo,
          szereplok: sorozat.szereplok,
          ertekeles: sorozat.ertekeles,
          evadokSzama: sorozat.evadokSzama,
          megjelenesiDatum: sorozat.megjelenesiDatum,
        }));

        const combined = [...filmResults, ...seriesResults];
        const filtered = combined.filter((item) =>
          item.cim.toLowerCase().includes(term)
        );
        setResults(filtered);
      })
      .catch((err) =>
        console.error('Hiba a keresési eredmények lekérésekor:', err)
      );
  }, [term, token]);

  return (
    <div className="search-results">
      <h2>Keresés: "{term}"</h2>
      <div className="results-container">
        {results.length > 0 ? (
          results.map((item) => (
            <div
              key={`${item.tipus}-${item.id}`}
              className="result-card"
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={FilmekSorozatokKepei[item.cim]?.image || '/placeholder.png'} 
                alt={item.cim}
                className="result-image"
              />
              <h3>{item.cim}</h3>
              <p>{item.mufaj}</p>
              <p className="tipus-label">{item.tipus}</p>
            </div>
          ))
        ) : (
          <p className="nincs-talalat">
            Nincs találat! <i className="fa-solid fa-magnifying-glass-minus"></i>
          </p>
        )}
      </div>

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
