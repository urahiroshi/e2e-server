import React, { PropTypes } from 'react';

const Modal = ({ name, title, onClose, children, modalState, hideModal }) => {
  if (modalState.name !== name) {
    return <div style={{ display: 'none' }} />;
  }
  const displayStyle = modalState.isVisible ? 'block' : 'none';
  return (
    <div className="modal" style={{ display: displayStyle }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={
                () => {
                  hideModal(name);
                  if (onClose) { onClose(); }
                }
              }
            >
              <span aria-hidden="true">×</span>
            </button>
            <h3 className="modal-title">{title}</h3>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.element.isRequired,
  modalState: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default Modal;
