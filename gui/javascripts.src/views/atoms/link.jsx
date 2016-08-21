const React = require('react');
const ReactDOM = require('react-dom');

module.exports = ({ href, text }) => {
  return <a href={href}>{text}</a>
};
