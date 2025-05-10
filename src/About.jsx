import React from 'react';
import './About.css';

export const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h2>Rólunk</h2>
        <p>
          A <span className="highlight">FilmFókusz</span> azért jött létre, hogy elhozza neked a legjobb filmes és sorozatos élményeket egy könnyen kezelhető, modern platformon.
        </p>
      </div>

      <div className="about-content">
        <h3>Miért válaszd a FilmFókuszt?</h3>
        <div className="about-features">
          <div className="feature-card">
            <h4>🎯 Személyre szabott ajánlások</h4>
            <p>Az ízlésedhez igazított ajánlatainkkal mindig megtalálod a legjobb tartalmakat.</p>
          </div>
          <div className="feature-card">
            <h4>🔍 Könnyű navigáció</h4>
            <p>Letisztult és intuitív dizájn segít a gyors keresésben és böngészésben.</p>
          </div>
          <div className="feature-card">
            <h4>💡 Érdekességek és kulisszatitkok</h4>
            <p>Tudj meg többet kedvenc filmjeidről, színészekről és forgatási titkokról!</p>
          </div>
          <div className="feature-card">
            <h4>🤝 Közösségi élmény</h4>
            <p>Oszd meg véleményedet másokkal, és fedezzetek fel együtt új kedvenceket.</p>
          </div>
          <div className="feature-card">
            <h4>🌟 Kritikusok és nézők véleménye</h4>
            <p>Nézd meg mások értékeléseit, és oszd meg saját véleményedet is!</p>
          </div>
          <div className="feature-card">
            <h4>⏳ Klasszikusok és újdonságok</h4>
            <p>Fedezd fel a régi klasszikusokat és a legújabb filmeket egy helyen!</p>
          </div>
        </div>

        <p className="closing-text">
          Legyen szó egy izgalmas akciófilmről, egy szívhez szóló drámáról vagy egy vígjátékról, nálunk mindig megtalálod, amit keresel.
        </p>

        <p className="closing-text">
          🎬 Fedezd fel a filmes világot velünk! Jó szórakozást kíván a <span className="highlight">FilmFókusz</span> csapata.
        </p>
      </div>

      <div className="about-logo-container">
        <img src="logo.png" alt="FilmFókusz logó" className="filmfokuszlogo"/>
      </div>
    </div>
  );
};
