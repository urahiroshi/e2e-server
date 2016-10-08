import React, { PropTypes } from 'react';

const Modal = ({ isVisible, children }) => {
  const displayStyle = isVisible ? 'block' : 'none';
  return (
    <div className="modal" style={{ display: displayStyle }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
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
  children: PropTypes.element.isRequired,
};

export default Modal;
