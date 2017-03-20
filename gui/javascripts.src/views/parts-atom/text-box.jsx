import React, { PropTypes } from 'react';

const TextBox = ({ onChange, defaultValue, placeHolder, style }) => (
  <input
    type="text"
    className="form-control"
    style={Object.assign({}, style)}
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
  style: PropTypes.object,
};

export default TextBox;
