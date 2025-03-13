import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './GenreSorozatoks.css';
import { FilmekSorozatokKepei } from './FilmekSorozatokKepei';
import { DetailModal } from './DetailModal';

export const GenreSorozatoks = () => {
  const { mufaj } = useParams();
  const [sorozat, setSorozatok] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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

  // Handle card click event to set selected series for modal
  const handleCardClick = (s) => {
    setSelectedItem({ ...s, tipus: 'Sorozat' });
  };

  return (
    <div className="genre-sorozatok2">
      <h2>{mufaj} sorozatok</h2>
      <div className="sorozatok2-container">
        {sorozat.length > 0 ? (
          sorozat.map((s) => (
            <div
              key={s.SorozatId}
              className="sorozat2-card"
              onClick={() => handleCardClick(s)}
              style={{
                backgroundImage: `url(${FilmekSorozatokKepei[s.cim]?.trailer || '/placeholder.png'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <img
                src={FilmekSorozatokKepei[s.cim]?.image || '/placeholder.png'}
                alt={s.cim}
                className="sorozat2-image"
              />
              <h3>{s.cim}</h3>
              <p>{s.mufaj}</p>
            </div>
          ))
        ) : (
          <p>Nincsenek találatok a(z) {mufaj} műfajra.</p>
        )}
      </div>

      {/* Conditionally render the DetailModal if a series is selected */}
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
