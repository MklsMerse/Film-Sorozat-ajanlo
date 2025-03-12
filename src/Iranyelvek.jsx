import React from 'react';
import './Iranyelvek.css';

const Iranyelvek = () => {
  return (
    <div className="iranyelvek-container">
      <h2>Irányelvek</h2>
      <p>
        Üdvözöljük az irányelvek oldalon! Az alábbiakban megtalálhatók az alkalmazásunk használatával
        kapcsolatos legfontosabb irányelvek:
      </p>

      <div className="iranyelv">
        <h3>1. Adatvédelem</h3>
        <p>
          Az adatvédelmet komolyan vesszük. Az Ön személyes adatainak védelme érdekében az alkalmazás
          minden szükséges biztonsági intézkedést megtesz.
        </p>
      </div>

      <div className="iranyelv">
        <h3>2. Felhasználói viselkedés</h3>
        <p>
          Az alkalmazás célja, hogy pozitív és támogató közösséget építsen. Bármilyen zaklató vagy sértő
          viselkedés nem megengedett.
        </p>
      </div>

      <div className="iranyelv">
        <h3>3. Használati feltételek</h3>
        <p>
          A felhasználóknak be kell tartaniuk a szolgáltatás használatára vonatkozó feltételeket. További
          információkat a használati feltételek oldalon találhat.
        </p>
      </div>
      <div className="iranyelv">
      <h3>4. Fiókját felfüggeszthetjük az alábbi esetekben:</h3>
        <ol>
          <li>
            <strong>Szabályzat megsértése:</strong> Ha a felhasználó megsérti az oldal általános használati szabályait, beleértve a nem megfelelő tartalmat, vagy más felhasználókat zavaró viselkedést.
          </li>
          <li>
            <strong>Szélhámos tevékenység:</strong> A fiók felfüggesztésre kerül, ha valaki hamis információkat ad meg, vagy más felhasználók személyes adatait próbálja megszerezni.
          </li>
          <li>
            <strong>Jogellenes tevékenység:</strong> Bármilyen olyan tevékenység, amely sérti a törvényeket, beleértve a szerzői jogi jogsértéseket, illetve a zaklató, fenyegető vagy másokat bántalmazó magatartást.
          </li>
          <li>
            <strong>Felhasználói magatartás:</strong> Felfüggesztésre kerülhet a fiók, ha a felhasználó durván, tiszteletteljesen nem viselkedik, másokat sértő vagy zaklató megjegyzéseket tesz, valamint ha a közösségi normákat, etikai irányelveket megszegi. Az ilyen típusú viselkedés a közösség harmóniáját és biztonságát veszélyezteti.
          </li>
        </ol>
        </div>
        <p className="iranyelvek-footer">
            Kérjük, tartsd tiszteletben közösségünket és irányelveinket, hogy mindenki számára biztonságos és kellemes élményt biztosíthassunk. Jó szórakozást kívánunk az oldalunkon!
        </p>
        <img src="logo.png" alt="Weboldal logó" className="logo"/>
    </div>
  );
};

export default Iranyelvek;
