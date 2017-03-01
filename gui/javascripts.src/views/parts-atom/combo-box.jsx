import React, { PropTypes } from 'react';

const ComboBox = ({ onChange, selections, selected }) =>
  <select
    className="form-control"
    defaultValue={selected}
    onChange={(event) => {
      onChange(event.target.value.trim());
    }}
  >
    {
      Object.keys(selections).map((value, i) =>
        <option key={i} value={value}>
          {selections[value]}
        </option>
      )
    }
  </select>;

ComboBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  selections: PropTypes.object.isRequired,
  selected: PropTypes.string,
};

export default ComboBox;
