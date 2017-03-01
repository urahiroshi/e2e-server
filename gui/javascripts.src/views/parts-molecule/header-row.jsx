import React, { PropTypes } from 'react';

const HeaderRow = ({ cells }) =>
  <tr>
    {
      cells.map((cell, i) => <th key={i}>{cell}</th>)
    }
  </tr>;

HeaderRow.propTypes = {
  cells: PropTypes.array.isRequired,
};

export default HeaderRow;
