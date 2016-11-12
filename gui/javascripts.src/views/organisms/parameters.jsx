import React, { PropTypes } from 'react';

import Heading from '../atoms/heading.jsx';
import Button from '../atoms/button.jsx';
import Table from '../organisms/table.jsx';

const style = {
  table: {},
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

const Parameters = ({ keyValues, onClickEdit, onClickDelete }) =>
  <div>
    <Heading value="Parameters" />
    <table style={style.table}>
      <tbody>
      {
        Object.keys(keyValues).map((key) => {
          const value = keyValues[key];
          let cell;
          if (value && value.header && value.rows) {
            cell = <Table header={value.header} rows={value.rows} />;
          } else {
            cell = value;
          }
          return (
            <tr key={key} style={style.tr}>
              <th style={style.th}>{key}</th>
              <td style={style.td}>{cell}</td>
            </tr>
          );
        })
      }
      </tbody>
    </table>
    { (onClickEdit) ?
      <Button label="edit" onClick={onClickEdit} /> : ''
    }
    { (onClickDelete) ?
      <Button label="delete" onClick={onClickDelete} /> : ''
    }
  </div>;

Parameters.propTypes = {
  keyValues: PropTypes.object.isRequired,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};

export default Parameters;
