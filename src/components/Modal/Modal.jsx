import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.style';
const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };
  backDropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  };
  render() {
    return createPortal(
      <Overlay onClick={this.backDropClick}>
        <ModalWindow>{this.props.children}</ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
