import React from "react";

export default function MessageModal({ show, onClose, title, message }) {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">
          <h2>{title}</h2>
        </div>
        <div className="modal-content">
          <p>{message}</p>
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}