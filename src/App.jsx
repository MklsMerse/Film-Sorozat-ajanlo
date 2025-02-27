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
  const updateProfilePicture = async (newPic) => {
    // Frissítjük a lokális állapotot és a localStorage-t
    const updatedUser = { ...loggedInUser, profilePicture: newPic };
    setLoggedInUser(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
  
    // Most küldünk egy PUT kérést a backend felé a profilkép frissítésére
    try {
      const response = await fetch("http://localhost:5104/api/User/updateProfilePicture", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ UserId: updatedUser.Id, NewProfilePicturePath: newPic })
      });
  
      if (!response.ok) {
        const errorMsg = await response.text();
        console.error("Profilkép frissítési hiba: ", errorMsg);
      }
    } catch (error) {
      console.error("Hiba történt a profilkép frissítésekor: ", error.message);
    }
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
                      <li className="nav-item dropdown"
                          onMouseEnter={() => setShowSeriesDropdown(true)}
                          onMouseLeave={() => setShowSeriesDropdown(false)}>
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
                 {/* Profilkép és felhasználónév megjelenítése a jobb felső sarokban */}
{loggedInUser && (
  <div className="navbar-profile" onClick={() => setShowProfileModal(true)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
    <span style={{ marginRight: '8px', color: '#fff', fontWeight: 'bold' }}>
      {loggedInUser.LoginNev || loggedInUser.username}
    </span>
    <img 
      src={loggedInUser.profilePicture ? loggedInUser.profilePicture : '/defaultuser.png'} 
      alt="Profil" 
      className="profile-image"
      style={{ height: '40px', width: '40px', borderRadius: '50%', border: '1px solid #fff' }}
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
