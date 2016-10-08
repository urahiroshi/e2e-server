import React, { PropTypes } from 'react';

const Modal = ({ isVisible, title, children, onClose }) => {
  const displayStyle = isVisible ? 'block' : 'none';
  return (
    <div className="modal" style={{ display: displayStyle }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={onClose}
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
  isVisible: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
