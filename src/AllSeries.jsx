import React, { useEffect, useState } from 'react';
import './AllSeries.css';
import { FilmekSorozatokKepei } from './FilmekSorozatokKepei';
import { DetailModal } from './DetailModal'; 

export const AllSeries = ({ searchTerm }) => {
  const [sorozat, setSeries] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); 

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

  const handleCardClick = (soro) => {
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
                style={{
                  backgroundImage: `url(${FilmekSorozatokKepei[soro.cim]?.trailer || '/placeholder.png'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <img
                  src={FilmekSorozatokKepei[soro.cim]?.image || '/placeholder.png'}
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
