import React from 'react';

export const MovieList = ({ movies }) => {
  return (
    <div className="card-container">
      {movies.map((movie, index) => (
        <div key={index} className="card">
        <img src={movie.image} alt={movie.title} />
        <h3>{movie.title}</h3>
        <p>{movie.genre}</p>
      </div>
      ))}
    </div>
  );
};
