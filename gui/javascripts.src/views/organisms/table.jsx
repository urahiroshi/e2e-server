import React, { PropTypes } from 'react';

import Row from '../molecules/row.jsx';
import HeaderRow from '../molecules/header-row.jsx';

const Table = ({ header, rows, style }) =>
  <table className="table table-striped" style={style} >
    <thead>
      <HeaderRow cells={header} />
    </thead>
    <tbody>
      {
        rows.map((cells, i) => <Row key={i} cells={cells} />)
      }
    </tbody>
  </table>;

Table.propTypes = {
  header: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  style: PropTypes.object,
};

export default Table;
