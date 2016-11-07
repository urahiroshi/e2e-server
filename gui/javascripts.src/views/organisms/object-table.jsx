import React, { PropTypes } from 'react';

import Table from '../organisms/table.jsx';

const ObjectTable = ({ objects, keys, style }) => {
  const header = [];
  const rows = [];
  objects.forEach((object, rowIndex) => {
    rows.push(header.map(() => ''));
    Object.keys(object)
    .filter((key) => (keys.indexOf(key) >= 0))
    .forEach((key) => {
      const colIndex = header.indexOf(key);
      if (colIndex >= 0) {
        rows[rowIndex][colIndex] = object[key];
      } else {
        header.push(key);
        rows[rowIndex].push(object[key]);
      }
    });
  });
  return (
    <Table header={header} rows={rows} style={style} />
  );
};

ObjectTable.propTypes = {
  objects: PropTypes.array.isRequired,
  keys: PropTypes.array,
  style: PropTypes.object,
};

export default ObjectTable;
