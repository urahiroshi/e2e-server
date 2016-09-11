import React, { PropTypes } from 'react';
import _ from 'lodash';

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

const Parameters = ({ keyValues }) =>
  <div>
    <Heading value="Parameters" />
    <table style={style.table}>
      <tbody>
      {
        _.map(keyValues, (value, key) => {
          let cell;
          if (_.isObject(value)) {
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
    <Button label="edit" />
  </div>;

Parameters.propTypes = {
  keyValues: PropTypes.object.isRequired,
};

export default Parameters;
