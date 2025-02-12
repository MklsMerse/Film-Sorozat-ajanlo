import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Footer } from './Footer';
import { Home } from './Home';
import { About } from './About';
import { Login } from './Login';
import { MovieList } from './MovieList';
import { SeriesList } from './SeriesList';

export const App = () => {
  return (
    <Router>
       <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-brand">Filmfókusz</div>
          <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink to={"/MovieList"} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                      <span className="nav-link">Filmek</span></NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={"/SeriesList"} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                      <span className="nav-link">Sorozatok</span></NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={"/about"} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                      <span className="nav-link">Rólunk</span></NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={"/login"} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                      <span className="nav-link">Bejelntkezés</span></NavLink>
                  </li>
              </ul>
            </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie" element={<MovieList />} />
        <Route path="/series" element={<SeriesList />} />
        
      </Routes>
      <Footer />
    </Router>
  );
};

