import React, { useState, useEffect } from 'react';
import { FilmekSorozatokKepei } from './FilmekSorozatokKepei';
import './DetailModal.css';

export const DetailModal = ({ item, onClose, onRatingUpdate }) => {
  const [rating, setRating] = useState(item.ertekeles || 0);
  const [backgroundUrl, setBackgroundUrl] = useState('');

  useEffect(() => {
    if (item.cim && FilmekSorozatokKepei[item.cim]) {
      const trailerUrl = FilmekSorozatokKepei[item.cim].trailer;
      setBackgroundUrl(trailerUrl); // Beállítjuk az előzetes URL-t
    }
  }, [item]);

  const dateObj = new Date(item.megjelenesiDatum);
  const dateOnly = !isNaN(dateObj.getTime())
    ? dateObj.toISOString().slice(0, 10)
    : "Érvénytelen dátum";

  const handleRatingClick = (value) => {
    setRating(value);
    onRatingUpdate(item.id, value, item.tipus);
  };

  const link = item.filmUrl || item.sorozatUrl || item.url;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Trailer videó háttérben, ha elérhető */}
        {backgroundUrl && (
          <div className="modal-trailer-background">
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${backgroundUrl.split('=')[1]}?autoplay=1&mute=1&loop=1&playlist=${backgroundUrl.split('=')[1]}`} 
              frameBorder="0" 
              allow="autoplay; encrypted-media" 
              allowFullScreen
              title={`Trailer of ${item.cim}`} 
            />
          </div>
        )}

        <button className="modal-close" onClick={onClose}>×</button>
        {/*<h2 className="modal-title">{item.cim}</h2>*/}
        
        <div className="modal-content">
          {/* Bal oldalt a kép */}
          <div className="modal-left">
            <img
              src={FilmekSorozatokKepei[item.cim]?.image || '/placeholder.png'}
              alt={item.cim}
              className="modal-image"
            />
          </div>
          
          {/* Jobb oldalt az adatok */}
          <div className="modal-right">
            <p><strong>Cím:</strong> {item.cim}</p>
            <p><strong>Leírás:</strong> {item.leiras}</p>
            <p><strong>Megjelenési dátum:</strong> {dateOnly}</p>
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
