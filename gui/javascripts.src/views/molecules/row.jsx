const React = require('react');
const ReactDOM = require('react-dom');

module.exports = ({ cells }) => {
  return (
    <tr>
      {
        cells.map((cell, i) => {
          return (
            <td key={i}>{cell}</td>
          )
        })
      }
    </tr>
  );
};
