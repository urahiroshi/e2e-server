import React, { PropTypes } from 'react';

const Modal = ({
  name,
  title,
  onClose,
  children,
  isVisible,
  getContent,
  onClickCloseButton,
}) => {
  if (!isVisible(name)) {
    return <div style={{ display: 'none' }} />;
  }
  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={
                () => {
                  onClickCloseButton(name);
                  if (onClose) { onClose(name); }
                }
              }
            >
              <span aria-hidden="true">×</span>
            </button>
            <h3 className="modal-title">{title}</h3>
          </div>
          <div className="modal-body">
            {getContent(name) || children}
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
  isVisible: PropTypes.func.isRequired,
  getContent: PropTypes.func.isRequired,
  onClickCloseButton: PropTypes.func.isRequired,
};

export default Modal;
