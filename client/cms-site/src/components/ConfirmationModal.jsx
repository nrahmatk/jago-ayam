import React from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <p>{message}</p>
          <div className="modal-buttons">
            <button onClick={onCancel}>Cancel</button>
            <button onClick={onConfirm}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
