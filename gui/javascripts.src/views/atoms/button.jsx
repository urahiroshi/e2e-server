import React, { PropTypes } from 'react';

const Button = ({ children, onClick, className, style }) =>
  <button
    className={className || 'btn btn-default'}
    style={Object.assign({}, { fontWeight: 'bold' }, style || {})}
    onClick={onClick}
  >
    {children}
  </button>;

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string, PropTypes.element, PropTypes.array,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Button;
