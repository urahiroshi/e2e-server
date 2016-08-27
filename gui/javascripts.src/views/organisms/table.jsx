import React, { PropTypes } from 'react';

import Row from '../molecules/row.jsx';
import HeaderRow from '../molecules/header-row.jsx';

const Table = ({ header, rows }) =>
  <table className="table table-striped">
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
};

export default Table;
