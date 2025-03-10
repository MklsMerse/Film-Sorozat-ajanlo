import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import './AuthPage.css';

export const AuthPage = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

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

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert("Kérlek egy képfájlt válassz!");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target.result; // ez a teljes data URL ("data:image/png;base64,...")
        // Szedd ki belőle csak a Base64 részt
        const base64String = result.split(',')[1];
        const img = new Image();
        img.onload = () => {
          if (img.width > 320 || img.height > 320) {
            alert("A profilkép maximális mérete 320x320 pixel lehet. Kérlek válassz kisebb képet!");
            setProfilePicture(null);
            setProfilePicturePreview(null);
          } else {
            setProfilePicture(base64String); // csak a Base64 részt tároljuk
            setProfilePicturePreview(result); // előnézethez a teljes data URL-t használjuk
          }
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAuth = async () => {
    // Ellenőrzés, hogy minden szükséges mező ki van-e töltve
    if (!username || !password || (!isLogin && (!fullName || !email || !confirmPassword))) {
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

      const newUser = {
        fullName: fullName,
        username: username,
        email: email,
        password: password, // A jelszót szerveroldalon hash-eljük
        profilePicture: profilePicture || ""
      };

      try {
        // Regisztrációs végpont: módosítsd a backend URL-t, ha szükséges
        const response = await fetch("http://localhost:5104/api/User/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser)
        });

        if (!response.ok) {
          const errorMsg = await response.text();
          alert("Hiba: " + errorMsg);
          return;
        }

        alert('Regisztráció sikeres! Kérlek jelentkezz be.');
        setIsLogin(true);
        setFullName('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setCaptchaValue(null);
        setProfilePicture(null);
        setProfilePicturePreview(null);
      } catch (error) {
        alert("Hiba történt: " + error.message);
      }
    } else {
      // BEJELENTKEZÉS
      try {
        const loginData = {
          username: username,
          password: password
        };

        const response = await fetch("http://localhost:5104/api/User/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData)
        });

        if (!response.ok) {
          const errorMsg = await response.text();
          alert("Hiba: " + errorMsg);
          return;
        }

        // Bejelentkezés sikeres: A szerver visszaküldi a felhasználó adatait
        const userData = await response.json();
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
        localStorage.setItem("token", userData.token);
        setIsAuthenticated(true);
        navigate("/"); // Navigálás a főoldalra (Home.jsx)
      } catch (error) {
        alert("Hiba történt: " + error.message);
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Bejelentkezés' : 'Regisztráció'}</h2>
      {/* Regisztrációs módban jelenik meg a Teljes Név input */}
      {!isLogin && (
        <input 
          type="text" 
          placeholder="Teljes Név" 
          value={fullName} 
          onChange={(e) => setFullName(e.target.value)}
        />
      )}
      <input 
        type="text" 
        placeholder="Felhasználónév" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
      />
      {!isLogin && (
        <div className="registration-extra">
          <div className="registration-left">
            <input 
              type="email" 
              placeholder="E-mail cím" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="registration-right">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleProfilePictureChange} 
            />
            {profilePicturePreview && (
              <div className="profile-picture-preview">
                <img 
                  src={profilePicturePreview} 
                  alt="Profilkép előnézet" 
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }} 
                />
              </div>
            )}
          </div>
        </div>
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

export default AuthPage;
