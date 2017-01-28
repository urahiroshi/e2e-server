import React, { PropTypes } from 'react';

const TextBox = ({ onChange, defaultValue, placeHolder }) => (
  <input
    type="text"
    className="form-control"
    placeholder={placeHolder || ''}
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
  placeHolder: PropTypes.string,
};

export default TextBox;
