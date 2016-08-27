import React, { PropTypes } from 'react';

const Button = ({ label }) =>
  <button className="btn btn-default">{label}</button>;

Button.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Button;
