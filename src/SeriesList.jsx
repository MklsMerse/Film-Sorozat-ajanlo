import React from 'react';

export const SeriesList = ({ series }) => {
  return (
    <div className="card-container">
      {series.map((serie, index) => (
        <div key={index} className="card">
          <img src={serie.image} alt={serie.title} />
          <h3>{serie.title}</h3>
          <p>{serie.genre}</p>
        </div>
      ))}
    </div>
  );
};
