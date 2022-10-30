import './Modal.scss';
import { useLayoutEffect } from 'react';
import Portal from '../Portal/Portal';
import { icons } from '../../constants/index';

function Modal({ isModalOpen, children, modalId, closeModal }) {
  // make sure that body is scrollable all the time
  document.body.style.overflow = 'scroll';
  // close modal on ESC keydown event
  useLayoutEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      const close = (e) => {
        if (e.key === 'Escape') {
          closeModal();
        }
      };
      window.addEventListener('keydown', close);
      return () => window.removeEventListener('keydown', close);
    }
  }, [isModalOpen, closeModal]);

  if (!isModalOpen) return null;
  // Prevent body scroll while modal is open
  if (isModalOpen) {
    document.body.style.overflow = 'hidden';
  }

  return (
    <Portal portalId={modalId}>
      <div className={`overlay ${isModalOpen ? 'show' : ''}`}>
        <div className="modal">
          <button onClick={() => closeModal()} autoFocus className="modal__exit-btn">
            <img src={icons.close} alt="close button" />
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
