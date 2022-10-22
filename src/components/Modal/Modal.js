import React from 'react';
import './Modal.scss';

function Modal() {
  return (
    <div className="overlay">
      <div className="modal">
        <button className="modal__close-btn"></button>
      </div>
    </div>
  );
}

export default Modal;
