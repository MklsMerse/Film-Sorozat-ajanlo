import React, { useState } from 'react';
import { FilmekSorozatokKepei } from './FilmekSorozatokKepei';
import './DetailModal.css';

export const DetailModal = ({ item, onClose, onRatingUpdate }) => {
  const [rating, setRating] = useState(item.ertekeles || 0);

  const handleRatingClick = (value) => {
    setRating(value);
    onRatingUpdate(item.id, value, item.tipus);
  };

  // A link meghatározása: filmeknél filmUrl, sorozatoknál sorozatUrl, egyéb esetben item.url
  const link = item.filmUrl || item.sorozatUrl || item.url;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Trailer videó háttérben, ha elérhető */}
        {item.TrailerUrl && (
          <video className="modal-trailer" autoPlay muted loop>
            <source src={item.TrailerUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">{item.cim}</h2>
        
        <div className="modal-content">
          {/* Bal oldalt a kép */}
          <div className="modal-left">
            <img
              src={FilmekSorozatokKepei[item.cim] || '/placeholder.png'}
              alt={item.cim}
              className="modal-image"
            />
          </div>
          
          {/* Jobb oldalt az adatok */}
          <div className="modal-right">
            <p><strong>Leírás:</strong> {item.leiras}</p>
            <p><strong>Megjelenési dátum:</strong> {item.megjelenesiDatum}</p>
            <p><strong>Műfaj:</strong> {item.mufaj}</p>
            <p><strong>Rendező:</strong> {item.rendezo}</p>
            <p><strong>Szereplők:</strong> {item.szereplok}</p>
            {item.tipus === 'Sorozat' && (
              <p>
                <strong>Évadok száma:</strong> {item.evadokSzama || item.evadok_szama}
              </p>
            )}
            <p>
              <strong>Link:</strong>{' '}
              {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              ) : (
                "Nincs link"
              )}
            </p>
            <div className="modal-rating">
              <strong>Értékelés:</strong>
              <div className="rating-buttons">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    className={`rating-button ${rating === value ? 'selected' : ''}`}
                    onClick={() => handleRatingClick(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
