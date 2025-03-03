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
import { GenreFilms } from './GenreFilms';
import './App.css';
import { GenreSorozatoks } from './GenreSorozatoks';

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
      const storedUser = localStorage.getItem('loggedInUser');
      if (storedUser) {
        setLoggedInUser(JSON.parse(storedUser));
      }
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    setIsAuthenticated(false);
    setShowLogoutModal(false);
    navigate('/');
  };

  // Frissíti a loggedInUser állapotát az új profilképpel
  const handleProfilePicUpdate = (newPicture) => {
    setLoggedInUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        profilePicture: newPicture,
      };
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <div>
      <Routes>
        {!isAuthenticated ? (
          // Ha nem vagyunk bejelentkezve, az AuthPage jelenik meg
          <Route path="/*" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
        ) : (
          // Bejelentkezett állapotban a főoldal és a navbar jelenik meg
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
                        borderRadius: '50%',
                      }}
                    />
                    <NavLink className="navbar-brand" to="/">
                      FilmFókusz
                    </NavLink>
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
                              <li>
                                <NavLink className="dropdown-item" to="/movies/Sci-Fi">
                                  Sci-Fi <i className="fa-solid fa-robot fa-bounce"></i>
                                </NavLink>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="/movies/Akció">
                                  Akció <i className="fa-solid fa-gun fa-bounce"></i>
                                </NavLink>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="/movies/Romantikus">
                                  Romantikus <i className="fa-solid fa-heart fa-beat"></i>
                                </NavLink>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="/movies/Dráma">
                                  Dráma <i className="fa-solid fa-masks-theater fa-bounce"></i>
                                </NavLink>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="/movies/Vígjáték">
                                  Vígjáték <i className="fa-solid fa-face-grin-squint-tears fa-shake"></i>
                                </NavLink>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="/movies/horror">
                                  Horror <i className="fa-solid fa-ghost fa-fade"></i>
                                </NavLink>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="/movies/thriller">
                                  Thriller <i className="fa-solid fa-exclamation fa-bounce"></i>
                                </NavLink>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="/movies/kaland">
                                  Kaland <i className="fa-solid fa-wand-sparkles fa-shake"></i>
                                </NavLink>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="/movies/dokumentumfilm">
                                  Dokumentumfilm <i className="fa-solid fa-book fa-beat"></i>
                                </NavLink>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="/movies/animáció">
                                  Animáció <i className="fa-solid fa-child-reaching fa-bounce"></i>
                                </NavLink>
                              </li>
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
                              <li>
                                <NavLink className="dropdown-item" to="/series/Sci-Fi">
                                  Sci-Fi <i className="fa-solid fa-robot fa-bounce"></i>
                                </NavLink>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="/series/Akció">
                                  Akció <i className="fa-solid fa-gun fa-bounce"></i>
                                </NavLink>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="/series/Romantikus">
                                  Romantikus <i className="fa-solid fa-heart fa-beat"></i>
                                </NavLink>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="/series/Dráma">
                                  Dráma <i className="fa-solid fa-masks-theater fa-bounce"></i>
                                </NavLink>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="/series/Vígjáték">
                                  Vígjáték <i className="fa-solid fa-face-grin-squint-tears fa-shake"></i>
                                </NavLink>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="/series/horror">
                                  Horror <i className="fa-solid fa-ghost fa-fade"></i>
                                </NavLink>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="/series/thriller">
                                  Thriller <i className="fa-solid fa-exclamation fa-bounce"></i>
                                </NavLink>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="/series/Kaland">
                                  Kaland <i className="fa-solid fa-wand-sparkles fa-shake"></i>
                                </NavLink>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="/series/Animáció">
                                  Animáció <i className="fa-solid fa-child-reaching fa-bounce"></i>
                                </NavLink>
                              </li>
                            </ul>
                          )}
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/about">
                            Rólunk
                          </NavLink>
                        </li>
                      </ul>
                    </div>

                   {/* Profil + kijelentkezés a jobb oldalon */}
                   {loggedInUser && (
                      <div className="navbar-profile" style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                          onClick={() => setShowProfileModal(true)}
                          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                        >
                          <span style={{ marginRight: '8px', color: '#fff', fontWeight: 'bold' }}>
                            {loggedInUser.LoginNev || loggedInUser.username}
                          </span>
                          <img
                            src={loggedInUser.profilePicture ? loggedInUser.profilePicture : '/defaultuser.png'}
                            alt="Profil"
                            className="profile-image"
                            style={{
                              height: '40px',
                              width: '40px',
                              borderRadius: '50%',
                              border: '1px solid #fff',
                              marginRight: '8px',
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
                          Kijelentkezés{' '}
                          <i className="fa-solid fa-arrow-right-from-bracket"></i>
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
                    onUpdateProfilePicture={handleProfilePicUpdate}
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
                  <Route path="/movies/:mufaj" element={<GenreFilms />} />
                  <Route path="/series" element={<SeriesList searchTerm={searchTerm} />} />
                  <Route path="/series/:mufaj" element={<GenreSorozatoks />} />
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