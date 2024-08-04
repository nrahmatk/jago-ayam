// components/ReuseAddButton.js
import React from 'react';

const ReuseAddButton = ({ onClick, label }) => {
  return (
    <button className="button-border" onClick={onClick}>
      {label}
    </button>
  );
};

export default ReuseAddButton;
