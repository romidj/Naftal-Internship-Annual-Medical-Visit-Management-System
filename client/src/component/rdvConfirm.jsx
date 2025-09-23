import React from 'react'

function RdvConfirm({ show, message, onClose, onConfirm }) {
    if (!show) {
        return null;
      }
    
      return (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <p>{message}</p>
              <div className="modal-actions">
                <button onClick={onClose}>Annuler</button>
                <button onClick={onConfirm}>Confirmer</button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default RdvConfirm
