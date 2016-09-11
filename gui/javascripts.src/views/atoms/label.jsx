import React, { PropTypes } from 'react';

const Label = ({ value, style }) =>
  <span style={style}>{value}</span>;

Label.propTypes = {
  value: PropTypes.string,
  style: PropTypes.object,
};

export default Label;
