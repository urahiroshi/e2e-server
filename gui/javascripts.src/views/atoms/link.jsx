import React, { PropTypes } from 'react';

const Link = ({ href, text }) =>
  <a href={href}>{text}</a>;

Link.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Link;
