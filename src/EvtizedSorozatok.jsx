import React, { useState, useEffect } from 'react';
import { DetailModal } from './DetailModal';
import { FilmekSorozatokKepei } from './FilmekSorozatokKepei';

const EvtizedMenu = () => {
  const [series, setSeries] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null); 
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const token = loggedInUser.token || 'token';

  useEffect(() => {
    const url = `http://localhost:5104/api/sorozatok/sorozatok-evtized/${token}/${selectedYear}`;
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
      .catch((err) => console.error('Hiba a sorozat lekérésekor:', err));
  }, [token, selectedYear]);

  const handleCardClick = (sorozat) => {
    setSelectedItem({ ...sorozat, tipus: 'Sorozat' });
  };

  return (
    <div>
      <div className="osszes-sorozatok">
     <h2>Sorozatok évtized Szerint:</h2>
      <div className="year-buttons-container">
        <button className="year-button" onClick={() => setSelectedYear(1980)}>1980</button>
        <button className="year-button" onClick={() => setSelectedYear(1990)}>1990</button>
        <button className="year-button" onClick={() => setSelectedYear(2000)}>2000</button>
        <button className="year-button" onClick={() => setSelectedYear(2010)}>2010</button>
        <button className="year-button" onClick={() => setSelectedYear(2020)}>2020</button>
      </div>

      <div className="series-wrapper">
             <div className="all-series-container">
               {series.length > 0 ? (
                 series.map((soro) => (
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
                <p className='NoSeries'>Kattintos! Melyik évtizedben szeretne informálódni sorozatokról?</p>
               )}
             </div>
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

export default EvtizedMenu;
