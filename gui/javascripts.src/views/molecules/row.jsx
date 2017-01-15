import React, { PropTypes } from 'react';

const Row = ({ cells, colStyles }) =>
  <tr>
    {
      cells.map((cell, i) =>
        <td style={colStyles && colStyles[i]} key={i}>{cell}</td>
      )
    }
  </tr>;

Row.propTypes = {
  cells: PropTypes.array.isRequired,
  colStyles: PropTypes.array,
};

export default Row;
