import React, { PropTypes } from 'react';

import Row from '../molecules/row.jsx';
import HeaderRow from '../molecules/header-row.jsx';

const Table = ({ header, rows, style, colStyles }) =>
  <table className="table table-striped" style={style} >
    { (header) ? <thead><HeaderRow cells={header} /></thead> : <thead /> }
    <tbody>
      {
        rows.map((cells, i) => <Row key={i} colStyles={colStyles} cells={cells} />)
      }
    </tbody>
  </table>;

Table.propTypes = {
  header: PropTypes.array,
  rows: PropTypes.array.isRequired,
  style: PropTypes.object,
  colStyles: PropTypes.array,
};

export default Table;
