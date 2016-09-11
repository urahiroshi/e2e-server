import React, { PropTypes } from 'react';

import Label from '../atoms/label.jsx';

const style = {
  heading: {
    display: 'inline-block',
    'font-weight': 'bold',
    width: '100px',
  },
};

const KeyValue = ({ heading, value }) =>
  <div>
    <Label value={heading} style={style.heading} />
    <Label value={value} />
  </div>;

KeyValue.propTypes = {
  heading: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default KeyValue;
