import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Footer } from './Footer';
import { Home } from './Home';
import { About } from './About';
import { Login } from './Login';
import { MovieList } from './MovieList';
import { SeriesList } from './SeriesList';
import './App.css';

export const App = () => {
  const [showMoviesDropdown, setShowMoviesDropdown] = useState(false);
  const [showSeriesDropdown, setShowSeriesDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <div className={darkMode ? 'dark-mode' : ''}>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">FilmFókusz</NavLink>
            <input 
              type="text" 
              placeholder="Keresés..." 
              className="form-control w-25" 
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
            <button className="btn btn-secondary" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? 'Világos mód' : 'Sötét mód'}
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item dropdown"
                    onMouseEnter={() => setShowMoviesDropdown(true)}
                    onMouseLeave={() => setShowMoviesDropdown(false)}>
                  <NavLink className="nav-link dropdown-toggle" to="/movies">
                    Filmek
                  </NavLink>
                  {showMoviesDropdown && (
                    <ul className="dropdown-menu show">
                      <li><NavLink className="dropdown-item" to="/movies/scifi">Sci-Fi</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/movies/action">Akció</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/movies/romance">Romantikus</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/movies/drama">Dráma</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/movies/comedy">Vígjáték</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/movies/horror">Horror</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/movies/thriller">Thriller</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/movies/adventure">Kaland</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/movies/documentary">Dokumentumfilm</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/movies/animation">Animáció</NavLink></li>
                    </ul>
                  )}
                </li>
                <li className="nav-item dropdown"
                    onMouseEnter={() => setShowSeriesDropdown(true)}
                    onMouseLeave={() => setShowSeriesDropdown(false)}>
                  <NavLink className="nav-link dropdown-toggle" to="/series">
                    Sorozatok
                  </NavLink>
                  {showSeriesDropdown && (
                    <ul className="dropdown-menu show">
                      <li><NavLink className="dropdown-item" to="/series/scifi">Sci-Fi</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/series/action">Akció</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/series/romance">Romantikus</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/series/drama">Dráma</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/series/comedy">Vígjáték</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/series/horror">Horror</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/series/thriller">Thriller</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/series/adventure">Kaland</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/series/animation">Animáció</NavLink></li>
                    </ul>
                  )}
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">Rólunk</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Bejelentkezés</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movies" element={<MovieList searchTerm={searchTerm} />} />
          <Route path="/series" element={<SeriesList searchTerm={searchTerm} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};
