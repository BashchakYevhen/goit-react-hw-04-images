import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.style';
const modalRoot = document.getElementById('modal-root');

export const Modal = ({ children, toggleModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };
  const backDropClick = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return createPortal(
    <Overlay onClick={backDropClick}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
};
Modal.propTypes = {
  children: PropTypes.element.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
