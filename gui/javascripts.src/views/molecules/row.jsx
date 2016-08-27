import React, { PropTypes } from 'react';

const Row = ({ cells }) =>
  <tr>
    {
      cells.map((cell, i) => <td key={i}>{cell}</td>)
    }
  </tr>;

Row.propTypes = {
  cells: PropTypes.array.isRequired,
};

export default Row;
