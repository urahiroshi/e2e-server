import React, { PropTypes } from 'react';

const style = {
  tr: {
    verticalAlign: 'top',
    borderTop: '1px #CCCCCC solid',
  },
  th: {
    padding: '10px 10px',
  },
  td: {
    padding: '10px 0px',
  },
};

const VerticalRow = ({ name, children }) =>
  <tr style={style.tr}>
    <th style={style.th}>{name}</th>
    <td style={style.td}>{children}</td>
  </tr>;

VerticalRow.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default VerticalRow;
