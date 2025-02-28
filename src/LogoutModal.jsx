import React from 'react';
import './LogoutModal.css';

export const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="logout-modal-overlay" onClick={onCancel}>
      <div className="logout-modal-content" onClick={(e) => e.stopPropagation()}>
        <p>Biztosan ki szeretnél jelentkezni?</p>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={onConfirm}>Igen</button>
          <button className="cancel-button" onClick={onCancel}>Nem</button>
        </div>
      </div>
    </div>
  );
};
