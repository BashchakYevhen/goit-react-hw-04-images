import { Component } from 'react';
import { createPortal } from 'react-dom';

export class Modal extends Component {
  render() {
    return (
      <div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
