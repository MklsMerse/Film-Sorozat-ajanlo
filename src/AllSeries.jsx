import React, { useEffect, useState } from 'react';
import './AllSeries.css';
import { FilmekSorozatokKepei } from './FilmekSorozatokKepei';
import { DetailModal } from './DetailModal'; // Fontos, hogy importáld a DetailModal komponenst

export const AllSeries = ({ searchTerm }) => {
  const [sorozat, setSeries] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Új állapot a DetailModal-hoz

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

  // Kattintás eseménykezelő: kiválasztott sorozat beállítása
  const handleCardClick = (soro) => {
    // A DetailModal tudni fogja, hogy sorozatról van szó
    setSelectedItem({ ...soro, tipus: 'Sorozat' });
  };

  return (
    <div className="osszes-sorozatok">
      <h2>Összes sorozat</h2>
      <div className="series-wrapper">
        <div className="all-series-container">
          {sorozat.length > 0 ? (
            sorozat.map((soro) => (
              <div
                key={soro.SorozatId}
                className="all-series-card"
                onClick={() => handleCardClick(soro)}
              >
                <img
                  src={FilmekSorozatokKepei[soro.cim] || '/placeholder.png'}
                  alt={soro.cim}
                  className="sorozat-kep"
                />
                <h3>{soro.cim}</h3>
                <p>{soro.mufaj}</p>
              </div>
            ))
          ) : (
            <p>Betöltés...</p>
          )}
        </div>
      </div>

      {/* A DetailModal feltételes megjelenítése, ha van kiválasztott sorozat */}
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onRatingUpdate={(id, newRating, tipus) => {
            console.log('Frissítem az értékelést:', id, newRating, tipus);
            // Frissítjük a helyi állapotot, hogy a modalban is látszódjon a változás
            setSelectedItem({ ...selectedItem, ertekeles: newRating });
          }}
        />
      )}
    </div>
  );
};
