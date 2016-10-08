import React, { PropTypes } from 'react';

const Heading = ({ value }) =>
  <h4>{value}</h4>;

Heading.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Heading;
