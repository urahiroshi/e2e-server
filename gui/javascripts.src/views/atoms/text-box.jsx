import React, { PropTypes } from 'react';

const TextBox = ({ onChange, defaultValue }) => (
  <input
    type="text"
    className="form-control"
    defaultValue={defaultValue}
    onChange={(event) => {
      const value = event.target.value.trim();
      onChange(value);
    }}
  />
);

TextBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
};

export default TextBox;
