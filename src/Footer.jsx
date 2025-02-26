import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-left">
          <h4>Kapcsolat</h4>
          <p>Email: filmfokuszkando@gmail.com</p>
          <p>Telefon: +36 70 420 6921</p>
        </div>
        <div className="footer-center">
          <h4>Gyors linkek</h4>
          <ul>
            {/* A HashLink komponens segítségével a "Filmek" link a home oldalra navigál és gördít a #movies szakaszra */}
            <li>
              <HashLink smooth to="/#movies">
                Filmek
              </HashLink>
            </li>
            {/* Hasonló megoldás a "Sorozatok" linkhez */}
            <li>
              <HashLink smooth to="/#series">
                Sorozatok
              </HashLink>
            </li>
            <li>
              <Link to="/about">Rólunk</Link>
            </li>
          </ul>
        </div>
        <div className="footer-social">
          <h4>Kövess minket</h4>
          <div className="social-media">
            <a
              href="https://www.facebook.com/"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-facebook"></i> Facebook
            </a>
            <a
              href="https://www.instagram.com/"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram"></i> Instagram
            </a>
            <a
              href="https://www.tiktok.com/"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-tiktok"></i> TikTok
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Filmek és Sorozatok. Minden jog fenntartva.</p>
      </div>
    </footer>
  );
};
