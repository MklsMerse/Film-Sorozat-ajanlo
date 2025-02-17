import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      alert('Sikeres belépés!');
      navigate('/');
    } else {
      alert('Hibás felhasználónév vagy jelszó.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('Sikeres kijelentkezés!');
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <div>
          <h2>Bejelentkezve: {username}</h2>
          <button onClick={handleLogout}>Kijelentkezés</button>
        </div>
      ) : (
        <div>
          <h2>Bejelentkezés</h2>
          <input
            type="text"
            placeholder="Felhasználónév"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Jelszó"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Belépés</button>
        </div>
      )}
    </div>
  );
};
