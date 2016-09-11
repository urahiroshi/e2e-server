import React, { PropTypes } from 'react';
import _ from 'lodash';

import Heading from '../atoms/heading.jsx';
import Button from '../atoms/button.jsx';
import KeyValue from '../molecules/key-value.jsx';
import KeyTable from '../organisms/key-table.jsx';

const Parameters = ({ keyValues }) =>
  <div>
    <Heading value="Parameters" />
    {
      _.map(keyValues, (value, key) => {
        if (_.isObject(value)) {
          return (
            <KeyTable
              key={key}
              heading={key}
              tableHeader={value.header}
              tableRows={value.rows}
            />
          );
        }
        return <KeyValue key={key} heading={key} value={value} />;
      })
    }
    <Button label="edit" />
  </div>;

Parameters.propTypes = {
  keyValues: PropTypes.object.isRequired,
};

export default Parameters;
