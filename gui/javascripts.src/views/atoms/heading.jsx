import React, { PropTypes } from 'react';

const Heading = ({ value }) =>
  <h3>{value}</h3>;

Heading.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Heading;
