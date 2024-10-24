import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import '@/sass/modal.scss';

const Modal = ({ children, onClose, showCloseButton = true }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        {showCloseButton && (
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;