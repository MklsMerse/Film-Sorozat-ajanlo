import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Ellenőrizzük, hogy van-e bejelentkezett felhasználó
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsLoggedIn(true);
      navigate('/dashboard'); // Átirányítunk egy dashboard oldalra, ha be van jelentkezve
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password}),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(data.message || 'Hiba történt');
        return;
      }
  
      localStorage.setItem("loggedInUser", JSON.stringify(data));
      navigate('/');
    } catch (error) {
      alert('Hiba történt a bejelentkezés során.');
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    alert('Sikeres kijelentkezés!');
    navigate('/login');
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
