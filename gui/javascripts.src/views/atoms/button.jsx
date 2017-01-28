import React, { PropTypes } from 'react';

const Button = ({ children, onClick, className }) =>
  <button
    className={className || 'btn btn-default'}
    style={{ fontWeight: 'bold' }}
    onClick={onClick}
  >
    {children}
  </button>;

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string, PropTypes.element,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Button;
