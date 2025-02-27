import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Footer } from './Footer';
import { Home } from './Home';
import { About } from './About';
import { MovieList } from './MovieList';
import { SeriesList } from './SeriesList';
import { AuthPage } from './AuthPage';
import { ProfileModal } from './ProfileModal';
import './App.css';

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showMoviesDropdown, setShowMoviesDropdown] = useState(false);
  const [showSeriesDropdown, setShowSeriesDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Amikor a felhasználó bejelentkezik, betöltjük a localStorage-ban tárolt adatokat
  useEffect(() => {
    if (isAuthenticated) {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        setLoggedInUser(JSON.parse(storedUser));
      }
    }
  }, [isAuthenticated]);

  // Profilkép frissítése callback: módosítja a bejelentkezett felhasználó adatát
  const updateProfilePicture = (newPic) => {
    const updatedUser = { ...loggedInUser, profilePicture: newPic };
    setLoggedInUser(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    // Itt opcionálisan frissítheted a regisztrált felhasználók listáját is, ha szükséges.
  };

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route path="/*" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
        ) : (
          <Route path="/*" element={
            <div>
              <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                  <NavLink className="navbar-brand" to="/">
                  <img 
                      src="logo.png" 
                      alt="FilmFókusz Logo" 
                      style={{
                        height: '40px',
                        width: '40px',
                        marginRight: '10px',
                        border: '1px solid black',
                        borderRadius: '50%'
                      }} 
                    />FilmFókusz</NavLink>
                  <input 
                    type="text" 
                    placeholder="Keresés..." 
                    className="form-control w-25" 
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                  />
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
                    </ul>
                  </div>
                  {/* Profilkép megjelenítése a jobb felső sarokban, kattintható */}
                  {loggedInUser && (
                    <div className="navbar-profile" onClick={() => setShowProfileModal(true)}>
                      <img 
                        src={loggedInUser.profilePicture ? loggedInUser.profilePicture : '/defaultuser.png'} 
                        alt="Profil" 
                        className="profile-image"
                      />
                    </div>
                  )}
                </div>
              </nav>
              {/* Modal a profil adatok és profilkép módosításához */}
              {showProfileModal && loggedInUser && (
                <ProfileModal 
                  user={loggedInUser} 
                  onClose={() => setShowProfileModal(false)} 
                  onUpdateProfilePicture={updateProfilePicture}
                />
              )}
              <Routes>
                <Route path="/" element={<Home searchTerm={searchTerm} />} />
                <Route path="/about" element={<About />} />
                <Route path="/movies" element={<MovieList searchTerm={searchTerm} />} />
                <Route path="/series" element={<SeriesList searchTerm={searchTerm} />} />
              </Routes>
              <Footer />
            </div>
          } />
        )}
      </Routes>
    </Router>
  );
};
