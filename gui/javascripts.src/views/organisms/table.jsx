const React = require('react');
const ReactDOM = require('react-dom');

const Row = require('../molecules/row.jsx');
const HeaderRow = require('../molecules/header-row.jsx')

module.exports = ({ header, rows }) => {
  return (
    <table className="table table-striped">
      <thead>
        <HeaderRow cells={header}></HeaderRow>
      </thead>
      <tbody>
        {
          rows.map((cells, i) => {
            return (
              <Row key={i} cells={cells}></Row>
            )
          })
        }
      </tbody>
    </table>
  );
};
