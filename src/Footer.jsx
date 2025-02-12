import React from 'react';

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
          <li><a href="#movies">Filmek</a></li>
          <li><a href="#series">Sorozatok</a></li>
          <li><a href="#about">Rólunk</a></li>
        </ul>
      </div>
      <div className="footer-social">
        <h4>Kövess minket</h4>
        <div className="social-media">
          <a href="https://www.facebook.com/" className="social-icon" target="_blank"><i className="fa-brands fa-facebook"></i> Facebook</a>
          <a href="https://www.instagram.com/" className="social-icon" target="_blank"><i className="fa-brands fa-facebook"></i> Instagram</a>
          <a href="https://www.tiktok.com/" className="social-icon" target="_blank"><i className="fa-brands fa-tiktok"></i> TikTok</a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2025 Filmek és Sorozatok. Minden jog fenntartva.</p>
    </div>
  </footer>

  );
};
