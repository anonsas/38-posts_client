import close from '../../assets/icons/close.svg';
import './Modal.scss';
import { useLayoutEffect } from 'react';
import ReactPortal from '../ReactPortal/ReactPortal';

function Modal({ isOpen, children, modalId, onClose }) {
  // make sure that body is scrollable all the time
  document.body.style.overflow = 'scroll';
  // close modal on ESC keydown event
  useLayoutEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const close = (e: any) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', close);
      return () => window.removeEventListener('keydown', close);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  // Prevent body scroll while modal is open
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  }

  return (
    <ReactPortal portalId={modalId}>
      <div className={`overlay ${isOpen ? 'show' : ''}`}>
        <div className="modal">
          <button onClick={() => onClose()} autoFocus className="modal__exit-btn">
            <img src={close} alt="close button" />
          </button>
          {children}
        </div>
      </div>
    </ReactPortal>
  );
}

export default Modal;
