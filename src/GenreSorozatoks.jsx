import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './GenreSorozatoks.css';

// Képek objektuma, sorozatcímekhez rendelve
const sorozatImages = {
  "Stranger Things": "https://static.posters.cz/image/350/plakatok/stranger-things-seasons-i132237.jpg",
  "The Expanse": "https://m.media-amazon.com/images/M/MV5BYzUyYmI3MjctY2Q2MC00NmFjLTgwZGUtNWQzZWNlYmVjNzE2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Westworld": "https://m.media-amazon.com/images/M/MV5BMjM2MTA5NjIwNV5BMl5BanBnXkFtZTgwNjI2OTMxNTM@._V1_FMjpg_UX1000_.jpg",
  "Black Mirror": "https://hips.hearstapps.com/hmg-prod/images/black-mirror-font-1513096756.jpg?crop=1xw:1xh;center,top&resize=980:*",
  "The Mandalorian": "https://m.media-amazon.com/images/M/MV5BNjgxZGM0OWUtZGY1MS00MWRmLTk2N2ItYjQyZTI1OThlZDliXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "The 100": "https://m.media-amazon.com/images/M/MV5BNDdmZGYwOWEtN2FkZC00Y2ExLWJkY2UtNzFlODVlNzc3MGIzXkEyXkFqcGc@._V1_.jpg",
  "Altered Carbon": "https://m.media-amazon.com/images/M/MV5BNTY4MWY1ZDktZjQxZS00ZDc5LWE3OTctZDU5MzQ2ZWU5ZTJkXkEyXkFqcGc@._V1_.jpg",
  "Doctor Who": "https://m.media-amazon.com/images/M/MV5BZGVmY2RkZjAtZDAwMC00MmZhLThhMGItZmVlNzE4MTgyMWRkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Star Trek: Discovery": "https://images.prismic.io/star-trek-untold/8b2a6629-fc5c-40dc-ac35-6a43533e509f_StarTrek_Discovery_S2_KeyArt_2023_full.png?auto=compress,format",
  "Fringe": "https://m.media-amazon.com/images/M/MV5BMWVlMmE1MmEtNjhjMC00MDdmLWIzZGMtNjc1YTZmNDc2MWExXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
};

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
    <div className="genre-sorozatok">
      <h2>{mufaj} sorozatok</h2>
      <div className="sorozatok-container">
        {sorozat.length > 0 ? (
          sorozat.map((sorozat) => (
            <div key={sorozat.SorozatId} className="sorozat-card">
              <img
                src={sorozatImages[sorozat.cim] || '/placeholder.png'}
                alt={sorozat.cim}
                className="sorozat-image"
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
