import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import './AuthPage.css';

export const AuthPage = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const validatePassword = (pass) => {
    if (pass.length < 8) {
      return "A jelszó minimum 8 karakter hosszúságúnak kell lennie!";
    }
    if (!/[A-Z]/.test(pass)) {
      return "A jelszónak legalább 1 nagybetűt kell tartalmaznia!";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
      return "A jelszónak legalább 1 speciális karaktert kell tartalmaznia!";
    }
    return "";
  };

  const handleAuth = () => {
    if (!username || !password || (!isLogin && (!email || !confirmPassword))) {
      alert('Kérlek töltsd ki az összes mezőt!');
      return;
    }

    if (!isLogin) {
      // REGISZTRÁCIÓ
      if (!captchaValue) {
        alert("Kérlek erősítsd meg, hogy nem vagy robot!");
        return;
      }
      if (password !== confirmPassword) {
        alert("A megerősített jelszó nem egyezik a megadott jelszóval!");
        return;
      }
      const passwordError = validatePassword(password);
      if (passwordError) {
        alert(passwordError);
        return;
      }
      const storedUsers = localStorage.getItem('registeredUsers');
      let users = storedUsers ? JSON.parse(storedUsers) : [];
      if (users.some((u) => u.email === email)) {
        alert('Az e-mail cím már foglalt!');
        return;
      }
      const newUser = { username, email, password };
      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      alert('Regisztráció sikeres! Kérlek jelentkezz be.');
      setIsLogin(true);
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setCaptchaValue(null);
    } else {
      // BEJELENTKEZÉS
      const storedUsers = localStorage.getItem('registeredUsers');
      if (!storedUsers) {
        alert('Nincs regisztrált felhasználó, kérlek regisztrálj először!');
        return;
      }
      const users = JSON.parse(storedUsers);
      const user = users.find((u) => u.username === username && u.password === password);
      if (user) {
        setIsAuthenticated(true);
        navigate("/"); // Átirányítás a Home oldalra
      } else {
        alert('Hibás felhasználónév vagy jelszó!');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Bejelentkezés' : 'Regisztráció'}</h2>
      <input 
        type="text" 
        placeholder="Felhasználónév" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
      />
      {!isLogin && (
        <input 
          type="email" 
          placeholder="E-mail cím" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
      )}
      <div className="password-wrapper">
        <input 
          type={showPassword ? "text" : "password"} 
          placeholder="Jelszó" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>
      {!isLogin && (
        <div className="password-wrapper">
          <input 
            type={showConfirmPassword ? "text" : "password"} 
            placeholder="Jelszó megerősítése" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? "🙈" : "👁️"}
          </span>
        </div>
      )}
      {!isLogin && (
        <ReCAPTCHA
          sitekey="6LewKeMqAAAAANOmt-66WYvhdP2SUDM1iq2zY6Hi"
          onChange={onCaptchaChange}
        />
      )}
      <button onClick={handleAuth}>
        {isLogin ? 'Bejelentkezés' : 'Regisztráció'}
      </button>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Nincs fiókod? Regisztrálj!' : 'Van már fiókod? Jelentkezz be!'}
      </p>
    </div>
  );
};
