import React, { PropTypes } from 'react';

import Label from '../atoms/label.jsx';
import Table from '../organisms/table.jsx';

const style = {
  heading: {
    display: 'inline-block',
    'font-weight': 'bold',
    width: '100px',
  },
  table: {
    display: 'inline',
  },
};

const KeyTable = ({ heading, tableHeader, tableRows }) =>
  <div>
    <Label value={heading} style={style.heading} />
    <Table header={tableHeader} rows={tableRows} style={style.table} />
  </div>;

KeyTable.propTypes = {
  heading: PropTypes.string.isRequired,
  tableHeader: PropTypes.array.isRequired,
  tableRows: PropTypes.array.isRequired,
};

export default KeyTable;
