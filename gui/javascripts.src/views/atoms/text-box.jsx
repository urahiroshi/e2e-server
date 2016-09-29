import React, { PropTypes } from 'react';

const TextBox = ({ onChange }) =>
  <input
    type="text"
    className="form-control"
    onChange={(event) => {
      onChange(event.target.value.trim());
    }}
  />;

TextBox.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default TextBox;
