const React = require('react');
const ReactDOM = require('react-dom');
const HelloMessage = require('../templates/hello.jsx');

const methods = {
  render() {
    const mountNode = document.getElementById('content');
    ReactDOM.render(<HelloMessage name="John" />, mountNode);
  },
};

module.exports = methods;
