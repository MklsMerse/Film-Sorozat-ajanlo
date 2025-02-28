import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { Home } from './Home';
import { About } from './About';
import { MovieList } from './MovieList';
import { SeriesList } from './SeriesList';
import { AuthPage } from './AuthPage';
import { LogoutModal } from './LogoutModal';
import { ProfileModal } from './ProfileModal';
import './App.css';

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showMoviesDropdown, setShowMoviesDropdown] = useState(false);
  const [showSeriesDropdown, setShowSeriesDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const navigate = useNavigate();

  // Betöltjük a bejelentkezett felhasználót, ha van
  useEffect(() => {
    if (isAuthenticated) {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        setLoggedInUser(JSON.parse(storedUser));
      }
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    setIsAuthenticated(false);
    setShowLogoutModal(false);
    navigate("/"); // Visszavezet az AuthPage-re
  };

  return (
    <div>
      <Routes>
        {!isAuthenticated ? (
          // Ha nem vagyunk bejelentkezve, az AuthPage jelenik meg
          <Route path="/*" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
        ) : (
          // Ha be vagyunk jelentkezve, a főoldal és a navbar
          <Route
            path="/*"
            element={
              <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                  <div className="container-fluid">
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
                    />
                    <NavLink className="navbar-brand" to="/">FilmFókusz</NavLink>
                    <input
                      type="text"
                      placeholder="Keresés..."
                      className="form-control w-25"
                      onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                    />
                    <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav">
                        <li
                          className="nav-item dropdown"
                          onMouseEnter={() => setShowMoviesDropdown(true)}
                          onMouseLeave={() => setShowMoviesDropdown(false)}
                        >
                          <NavLink className="nav-link dropdown-toggle" to="/movies">
                            Filmek
                          </NavLink>
                          {showMoviesDropdown && (
                            <ul className="dropdown-menu show">
                              <li><NavLink className="dropdown-item" to="/movies/scifi">Sci-Fi <i class="fa-solid fa-robot fa-bounce"></i></NavLink></li>
                            <li><NavLink className="dropdown-item" to="/movies/action">Akció <i class="fa-solid fa-gun fa-bounce"></i></NavLink></li>
                            <li><NavLink className="dropdown-item" to="/movies/romance">Romantikus <i class="fa-solid fa-heart fa-beat"></i></NavLink></li>
                            <li><NavLink className="dropdown-item" to="/movies/drama">Dráma <i class="fa-solid fa-masks-theater fa-bounce"></i></NavLink></li>
                            <li><NavLink className="dropdown-item" to="/movies/comedy">Vígjáték <i class="fa-solid fa-face-grin-squint-tears fa-shake"></i></NavLink></li>
                            <li><NavLink className="dropdown-item" to="/movies/horror">Horror <i class="fa-solid fa-ghost fa-fade"></i></NavLink></li>
                            <li><NavLink className="dropdown-item" to="/movies/thriller">Thriller <i class="fa-solid fa-exclamation fa-bounce"></i></NavLink></li>
                            <li><NavLink className="dropdown-item" to="/movies/adventure">Kaland <i class="fa-solid fa-wand-sparkles fa-shake"></i></NavLink></li>
                            <li><NavLink className="dropdown-item" to="/movies/documentary">Dokumentumfilm <i class="fa-solid fa-book fa-beat"></i></NavLink></li>
                            <li><NavLink className="dropdown-item" to="/movies/animation">Animáció <i class="fa-solid fa-child-reaching fa-bounce"></i></NavLink></li>
                            </ul>
                          )}
                        </li>
                        <li
                          className="nav-item dropdown"
                          onMouseEnter={() => setShowSeriesDropdown(true)}
                          onMouseLeave={() => setShowSeriesDropdown(false)}
                        >
                          <NavLink className="nav-link dropdown-toggle" to="/series">
                            Sorozatok
                          </NavLink>
                          {showSeriesDropdown && (
                            <ul className="dropdown-menu show">
                              <li><NavLink className="dropdown-item" to="/series/scifi">Sci-Fi <i class="fa-solid fa-robot fa-bounce"></i></NavLink></li>
                            <li><NavLink className="dropdown-item" to="/series/action">Akció <i class="fa-solid fa-gun fa-bounce"></i></NavLink></li>
                            <li><NavLink className="dropdown-item" to="/series/romance">Romantikus  <i class="fa-solid fa-heart fa-beat"></i></NavLink></li>
                            <li><NavLink className="dropdown-item" to="/series/drama">Dráma <i class="fa-solid fa-masks-theater fa-bounce"></i></NavLink></li>
                            <li><NavLink className="dropdown-item" to="/series/comedy">Vígjáték <i class="fa-solid fa-face-grin-squint-tears fa-shake"></i></NavLink></li>
                            <li><NavLink className="dropdown-item" to="/series/horror">Horror <i class="fa-solid fa-ghost fa-fade"></i></NavLink></li>
                            <li><NavLink className="dropdown-item" to="/series/thriller">Thriller <i class="fa-solid fa-exclamation fa-bounce"></i></NavLink></li>
                            <li><NavLink className="dropdown-item" to="/series/adventure">Kaland <i class="fa-solid fa-wand-sparkles fa-shake"></i></NavLink></li>
                            <li><NavLink className="dropdown-item" to="/series/animation">Animáció <i class="fa-solid fa-child-reaching fa-bounce"></i></NavLink></li>
                            </ul>
                          )}
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/about">Rólunk</NavLink>
                        </li>
                      </ul>
                    </div>

                    {/* Profil + kijelentkezés a jobb oldalon */}
                    {loggedInUser && (
                      <div className="navbar-profile" style={{ display: 'flex', alignItems: 'center' }}>
                        {/* A profilra kattintva a ProfileModal jelenik meg */}
                        <div
                          onClick={() => setShowProfileModal(true)}
                          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                        >
                          <span style={{ marginRight: '8px', color: '#fff', fontWeight: 'bold' }}>
                            {loggedInUser.LoginNev || loggedInUser.username}
                          </span>
                          <img
                            src={loggedInUser.profilePicture ? loggedInUser.profilePicture : '/default-user.png'}
                            alt="Profil"
                            className="profile-image"
                            style={{
                              height: '40px',
                              width: '40px',
                              borderRadius: '50%',
                              border: '1px solid #fff',
                              marginRight: '8px'
                            }}
                          />
                        </div>
                        <button
                          onClick={() => setShowLogoutModal(true)}
                          style={{
                            backgroundColor: '#800020',
                            color: '#fff',
                            border: '3px solid black',
                            padding: '5px 10px',
                            borderRadius: '4px',
                          }}
                        >
                          Kijelentkezés <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </nav>

                {/* ProfileModal megjelenítése (ha showProfileModal true) */}
                {showProfileModal && loggedInUser && (
                  <ProfileModal
                    user={loggedInUser}
                    onClose={() => setShowProfileModal(false)}
                  />
                )}

                {/* Kijelentkezés megerősítő ablak */}
                {showLogoutModal && (
                  <LogoutModal
                    onConfirm={handleLogout}
                    onCancel={() => setShowLogoutModal(false)}
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
            }
          />
        )}
      </Routes>
    </div>
  );
};

export default App;
