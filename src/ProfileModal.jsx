import React, { useRef } from 'react';
import './ProfileModal.css';

export const ProfileModal = ({
  user,
  onClose,
  onUpdateProfilePicture
}) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Kérlek, egy képfájlt válassz!');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target.result; 
        const base64String = result.split(',')[1];
        const img = new Image();
        img.onload = () => {
          if (img.width > 320 || img.height > 320) {
            alert('A profilkép maximális mérete 320x320 pixel lehet. Kérlek válassz kisebb képet!');
            return;
          }
          // Frissítjük a profilképet a Base64 stringgel
          onUpdateProfilePicture(base64String);
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <img
  src={
    user && user.profilePicture && user.profilePicture.length > 0 
      ? `data:image/png;base64,${user.profilePicture}` 
      : '/defaultuser.png'
  }
  alt="Profil"
  className="profile-image"
/>

        <div className="profile-details">
          <p>
            <strong>Teljes Név:</strong> {user.fullName}
          </p>
          <p>
            <strong>Felhasználónév:</strong> {user.username}
          </p>
          <p>
            <strong>E-mail Cím:</strong> {user.email}
          </p>
        </div>
        <button className="change-picture-button" onClick={handleButtonClick}>
          Profilkép megváltoztatása
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};
